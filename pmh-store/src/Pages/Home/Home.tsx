import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  DashboardHeader,
  MetricCards,
  SalesTrendChart,
  CategoryChart,
  CustomerGrowthChart,
  PaymentMethodsChart,
  TopProducts,
  RecentActivities,
  StockAlerts,
  YearOverYearComparison,
  PerformanceMetrics,
  QuarterlyPerformance,
  DailyTrends,
  MonthlyInsights,
  OutstandingChart,
  SalesForecast,
  CustomerInsights,
  FinancialInsights,
  GrowthOpportunities,
  RiskAssessment
} from '../../Components/Dashboard';
import { 
  salesData, 
  categoryData, 
  topProducts, 
  recentActivities, 
  stockAlerts, 
  paymentMethods,
  monthlyInsights,
  performanceMetrics,
  monthlyComparison,
  quarterlyData,
  dailyTrends
} from './DashboardData';
import {
  salesForecast,
  customerInsights,
  financialInsights,
  growthOpportunities,
  riskInsights
} from './InsightsData';
import './Dashboard.scss';

const Home: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const [refreshing, setRefreshing] = useState(false);

  // Calculate summary metrics
  const totalSales = salesData.reduce((sum, month) => sum + month.sales, 0);
  const totalProfit = salesData.reduce((sum, month) => sum + month.profit, 0);
  const totalCustomers = Math.max(...salesData.map(month => month.customers));
  
  // Calculate total outstanding amount (from actual data where available, fallback to 12% of sales)
  const outstandingFromData = salesData
    .filter(month => month.outstandingAmount)
    .reduce((sum, month) => sum + (month.outstandingAmount || 0), 0);
  const totalOutstanding = outstandingFromData > 0 ? outstandingFromData : Math.round(totalSales * 0.12);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <div className="dashboard-container">
      <Container fluid className="py-4">
        {/* Header */}
        <DashboardHeader
          dateRange={dateRange}
          setDateRange={setDateRange}
          refreshing={refreshing}
          handleRefresh={handleRefresh}
        />

        {/* Key Metrics Cards */}
        <MetricCards
          totalSales={totalSales}
          totalProfit={totalProfit}
          totalOutstanding={totalOutstanding}
          totalCustomers={totalCustomers}
        />

        {/* Main Charts Row */}
        <Row className="mb-4">
          <Col xl={8} className="mb-3">
            <SalesTrendChart data={salesData} />
          </Col>
          <Col xl={4} className="mb-3">
            <CategoryChart data={categoryData} />
          </Col>
        </Row>

        {/* Secondary Charts Row */}
        <Row className="mb-4">
          <Col xl={4} className="mb-3">
            <CustomerGrowthChart data={salesData} />
          </Col>
          <Col xl={4} className="mb-3">
            <PaymentMethodsChart data={paymentMethods} />
          </Col>
          <Col xl={4} className="mb-3">
            <OutstandingChart data={salesData} />
          </Col>
        </Row>

        {/* Data Tables Row */}
        <Row className="mb-4">
          <Col xl={4} className="mb-3">
            <TopProducts data={topProducts} />
          </Col>
          <Col xl={4} className="mb-3">
            <RecentActivities data={recentActivities} />
          </Col>
          <Col xl={4} className="mb-3">
            <StockAlerts data={stockAlerts} />
          </Col>
        </Row>

        {/* Monthly Insights & Analytics */}
        <Row className="mb-4">
          <Col xl={8} className="mb-3">
            <YearOverYearComparison data={monthlyComparison} />
          </Col>
          <Col xl={4} className="mb-3">
            <PerformanceMetrics data={performanceMetrics} />
          </Col>
        </Row>

        {/* Detailed Analytics Row */}
        <Row className="mb-4">
          <Col xl={6} className="mb-3">
            <QuarterlyPerformance data={quarterlyData} />
          </Col>
          <Col xl={6} className="mb-3">
            <DailyTrends data={dailyTrends} />
          </Col>
        </Row>

        {/* Monthly Insights */}
        <Row>
          <Col>
            <MonthlyInsights data={monthlyInsights} />
          </Col>
        </Row>

        {/* Enhanced Business Insights */}
        <Row className="mb-4">
          <Col xl={6} className="mb-3">
            <SalesForecast data={salesForecast} />
          </Col>
          <Col xl={6} className="mb-3">
            <CustomerInsights data={customerInsights} />
          </Col>
        </Row>

        {/* Financial & Growth Insights */}
        <Row className="mb-4">
          <Col xl={6} className="mb-3">
            <FinancialInsights data={financialInsights} />
          </Col>
          <Col xl={6} className="mb-3">
            <GrowthOpportunities data={growthOpportunities} />
          </Col>
        </Row>

        {/* Risk Assessment */}
        <Row>
          <Col>
            <RiskAssessment data={riskInsights} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;