import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import {
  FaLightbulb,
  FaArrowUp,
  FaArrowDown,
  FaInfoCircle,
  FaStar
} from 'react-icons/fa';

interface MonthlyInsightItem {
  month: string;
  insight: string;
  keyMetric: string;
  trend: 'up' | 'down' | 'stable';
  recommendation: string;
}

interface MonthlyInsightsProps {
  data: MonthlyInsightItem[];
}

const MonthlyInsights: React.FC<MonthlyInsightsProps> = ({ data }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <FaArrowUp />;
      case 'down':
        return <FaArrowDown />;
      case 'stable':
        return <FaInfoCircle />;
      default:
        return <FaInfoCircle />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'success';
      case 'down':
        return 'danger';
      case 'stable':
        return 'info';
      default:
        return 'info';
    }
  };

  // Show only the last 6 months
  const recentInsights = data.slice(-6);

  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-transparent border-0 pb-0">
        <h5 className="mb-0">
          <FaLightbulb className="text-warning me-2" />
          Monthly Business Insights
        </h5>
      </Card.Header>
      <Card.Body>
        <Row>
          {recentInsights.map((insight, index) => (
            <Col xl={4} md={6} key={index} className="mb-3">
              <div className="insight-card border rounded p-3 h-100">
                <div className="d-flex align-items-center mb-2">
                  <div className={`insight-icon bg-${getTrendColor(insight.trend)} me-2`}>
                    {getTrendIcon(insight.trend)}
                  </div>
                  <div>
                    <h6 className="mb-0">{insight.month} 2024</h6>
                    <small className="text-muted">{insight.keyMetric}</small>
                  </div>
                </div>
                <p className="text-sm mb-2">{insight.insight}</p>
                <div className="recommendation bg-light p-2 rounded">
                  <small className="text-primary">
                    <FaStar className="me-1" />
                    <strong>Recommendation:</strong> {insight.recommendation}
                  </small>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MonthlyInsights;
