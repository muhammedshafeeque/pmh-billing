import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import {
  FaChartLine,
  FaUsers,
  FaDollarSign,
  FaArrowUp,
  FaArrowDown,
  FaExclamationCircle
} from 'react-icons/fa';

interface MetricCardProps {
  totalSales: number;
  totalProfit: number;
  totalOutstanding: number;
  totalCustomers: number;
}

const MetricCards: React.FC<MetricCardProps> = ({
  totalSales,
  totalProfit,
  totalOutstanding,
  totalCustomers
}) => {
  const metrics = [
    {
      title: 'Total Sales',
      value: `₹${(totalSales / 1000).toFixed(0)}K`,
      icon: FaDollarSign,
      color: 'primary',
      growth: '+12.5%',
      isPositive: true
    },
    {
      title: 'Total Profit',
      value: `₹${(totalProfit / 1000).toFixed(0)}K`,
      icon: FaChartLine,
      color: 'success',
      growth: '+8.2%',
      isPositive: true
    },
    {
      title: 'All Outstanding Amount',
      value: `₹${(totalOutstanding / 1000).toFixed(0)}K`,
      icon: FaExclamationCircle,
      color: 'warning',
      growth: '-5.2%',
      isPositive: false
    },
    {
      title: 'Active Customers',
      value: totalCustomers.toString(),
      icon: FaUsers,
      color: 'info',
      growth: '+6.8%',
      isPositive: true
    }
  ];

  return (
    <Row className="mb-4">
      {metrics.map((metric, index) => (
        <Col xl={3} md={6} key={index} className="mb-3">
          <Card className="border-0 shadow-sm metric-card h-100">
            <Card.Body className="d-flex align-items-center">
              <div className={`metric-icon bg-${metric.color} text-white rounded-circle me-3`}>
                <metric.icon size={24} />
              </div>
              <div className="flex-grow-1">
                <h6 className="text-muted mb-1 text-sm">{metric.title}</h6>
                <h4 className="mb-1">{metric.value}</h4>
                <div className="d-flex align-items-center">
                  {metric.isPositive ? (
                    <FaArrowUp className="text-success me-1" size={12} />
                  ) : (
                    <FaArrowDown className="text-danger me-1" size={12} />
                  )}
                  <small className={metric.isPositive ? 'text-success' : 'text-danger'}>
                    {metric.growth}
                  </small>
                  <small className="text-muted ms-1">vs last month</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MetricCards;
