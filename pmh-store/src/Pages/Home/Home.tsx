import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import {
  FaRupeeSign, FaFileInvoice, FaBoxOpen, FaChartLine, FaUserFriends, FaMoneyBillWave
} from 'react-icons/fa';
import axios from '../../Api/Api';
import moment from 'moment';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, BarElement, ArcElement } from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import './Home.scss';

// Register the necessary components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, BarElement, ArcElement);

// Define types
interface Transaction {
  _id: string;
  date: string;
  invoiceNumber: string;
  customerName: string;
  amount: number;
}

interface ChartData {
  month: string;
  amount: number;
}

interface DashboardData {
  todaysSales: number;
  monthlyRevenue: number;
  totalInvoices: number;
  pendingCollections: number;
  totalCustomers: number;
  lowStockItems: number;
  recentTransactions: Transaction[];
  monthlySalesData: ChartData[];
  paymentModeData: { mode: string; amount: number }[];
  topSellingItems: { name: string; quantity: number }[];
}

const Home: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get('accounts/dashboard');
      setDashboardData(data);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <Spinner animation="border" className="m-3" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!dashboardData) return null;

  // Chart Data
  const salesChartData = {
    labels: dashboardData.monthlySalesData.map((item) => item.month),
    datasets: [
      {
        label: 'Monthly Sales',
        data: dashboardData.monthlySalesData.map((item) => item.amount),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Chart Data for Top Selling Items
  const topSellingItemsData = {
    labels: dashboardData.topSellingItems.map((item) => item.name),
    datasets: [
      {
        label: 'Top Selling Items',
        data: dashboardData.topSellingItems.map((item) => item.quantity),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  // Chart Data for Payment Mode Distribution
  const paymentModeData = {
    labels: dashboardData.paymentModeData.map((item) => item.mode),
    datasets: [
      {
        label: 'Payment Mode Distribution',
        data: dashboardData.paymentModeData.map((item) => item.amount),
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      },
    ],
  };

  return (
    <Container fluid className="py-3">
      <h2 className="mb-4">Dashboard</h2>
      <Row className="g-3 mb-4">
        {/* Key Metrics Cards */}
        {[ 
          { title: "Today's Sales", value: dashboardData.todaysSales, icon: <FaRupeeSign size={24} />, bg: 'primary' },
          { title: "Monthly Revenue", value: dashboardData.monthlyRevenue, icon: <FaChartLine size={24} />, bg: 'success' },
          { title: "Total Invoices", value: dashboardData.totalInvoices, icon: <FaFileInvoice size={24} />, bg: 'info' },
          { title: "Pending Collections", value: dashboardData.pendingCollections, icon: <FaMoneyBillWave size={24} />, bg: 'warning' },
          { title: "Low Stock Items", value: dashboardData.lowStockItems, icon: <FaBoxOpen size={24} />, bg: 'danger' },
          { title: "Total Customers", value: dashboardData.totalCustomers, icon: <FaUserFriends size={24} />, bg: 'secondary' },
        ].map(({ title, value, icon, bg }, index) => (
          <Col key={index} md={4} xl={2}>
            <Card className="h-100 dashboard-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className={`icon-wrapper bg-${bg} text-white rounded p-3 me-3`}>
                    {icon}
                  </div>
                  <div>
                    <h6 className="mb-1">{title}</h6>
                    <h4 className="mb-0">₹{value}</h4>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts Section */}
      <Row className="g-3 mb-4">
        <Col md={8}>
          <Card className="h-100">
            <Card.Body>
              <h5 className="card-title mb-3">Sales Trend</h5>
              <div style={{ height: '300px' }}>
                <Line data={salesChartData} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <h5 className="card-title mb-3">Top Selling Items</h5>
              <div style={{ height: '300px' }}>
                <Bar data={topSellingItemsData} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <h5 className="card-title mb-3">Payment Mode Distribution</h5>
              <div style={{ height: '300px' }}>
                <Pie data={paymentModeData} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Transactions */}
      <Row className="g-3">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h5 className="card-title mb-3">Recent Transactions</h5>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Invoice</th>
                      <th>Customer</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.recentTransactions.map((transaction) => (
                      <tr key={transaction._id}>
                        <td>{moment(transaction.date).format('DD-MM-YYYY')}</td>
                        <td>{transaction.invoiceNumber}</td>
                        <td>{transaction.customerName}</td>
                        <td>₹{transaction.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
