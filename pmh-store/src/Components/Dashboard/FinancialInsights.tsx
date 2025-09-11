import React from 'react';
import { Card, Row, Col, Badge, ProgressBar } from 'react-bootstrap';
import { FaDollarSign, FaChartLine, FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

interface FinancialMetric {
  metric: string;
  current: number;
  projected?: number;
  optimal?: number;
  trend: 'positive' | 'negative' | 'stable' | 'improving';
  confidence: number;
  factors: string[];
  recommendation: string;
}

interface FinancialInsightsProps {
  data: FinancialMetric[];
}

const FinancialInsights: React.FC<FinancialInsightsProps> = ({ data }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'positive':
      case 'improving':
        return <FaCheckCircle className="text-success" />;
      case 'negative':
        return <FaExclamationTriangle className="text-danger" />;
      case 'stable':
        return <FaInfoCircle className="text-info" />;
      default:
        return <FaInfoCircle className="text-info" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'positive':
      case 'improving':
        return 'success';
      case 'negative':
        return 'danger';
      case 'stable':
        return 'info';
      default:
        return 'secondary';
    }
  };

  const formatValue = (value: number, metric: string) => {
    if (metric.includes('Ratio')) {
      return value.toFixed(2);
    }
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Header className="bg-transparent border-0 pb-0">
        <h5 className="mb-0">
          <FaDollarSign className="text-success me-2" />
          Financial Health Insights
        </h5>
      </Card.Header>
      <Card.Body>
        <div className="financial-metrics">
          {data.map((metric, index) => (
            <div key={index} className="metric-item mb-4 p-3 border rounded">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0 fw-bold">{metric.metric}</h6>
                <div className="d-flex align-items-center">
                  {getTrendIcon(metric.trend)}
                  <Badge bg={getTrendColor(metric.trend)} className="ms-2">
                    {metric.trend}
                  </Badge>
                </div>
              </div>
              
              <Row className="mb-2">
                <Col xs={6}>
                  <small className="text-muted">Current</small>
                  <div className="fw-bold text-primary">
                    {formatValue(metric.current, metric.metric)}
                  </div>
                </Col>
                <Col xs={6}>
                  <small className="text-muted">Confidence</small>
                  <div className="d-flex align-items-center">
                    <ProgressBar 
                      variant={metric.confidence > 80 ? 'success' : metric.confidence > 60 ? 'warning' : 'danger'}
                      now={metric.confidence} 
                      style={{ width: '60px', height: '8px' }}
                      className="me-2"
                    />
                    <span className="small">{metric.confidence}%</span>
                  </div>
                </Col>
              </Row>
              
              {metric.projected && (
                <Row className="mb-2">
                  <Col xs={6}>
                    <small className="text-muted">Projected</small>
                    <div className="fw-bold text-success">
                      {formatValue(metric.projected, metric.metric)}
                    </div>
                  </Col>
                  <Col xs={6}>
                    <small className="text-muted">Growth</small>
                    <div className="fw-bold text-success">
                      +{((metric.projected - metric.current) / metric.current * 100).toFixed(1)}%
                    </div>
                  </Col>
                </Row>
              )}
              
              {metric.optimal && (
                <div className="mb-2">
                  <small className="text-muted">Optimal Target</small>
                  <div className="fw-bold text-info">
                    {formatValue(metric.optimal, metric.metric)}
                  </div>
                </div>
              )}
              
              <div className="insight-box bg-light p-2 rounded mt-2">
                <small className="text-primary">
                  <FaChartLine className="me-1" />
                  <strong>Recommendation:</strong> {metric.recommendation}
                </small>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default FinancialInsights;
