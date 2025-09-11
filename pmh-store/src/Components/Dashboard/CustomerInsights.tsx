import React from 'react';
import { Card, Row, Col, Badge, ProgressBar } from 'react-bootstrap';
import { FaUsers, FaStar, FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface CustomerSegment {
  segment: string;
  count: number;
  avgOrderValue: number;
  frequency: number;
  loyalty: number;
  revenue: number;
  growth: number;
  insight: string;
}

interface CustomerInsightsProps {
  data: CustomerSegment[];
}

const CustomerInsights: React.FC<CustomerInsightsProps> = ({ data }) => {
  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'Premium Customers': return 'success';
      case 'Regular Customers': return 'primary';
      case 'New Customers': return 'info';
      default: return 'secondary';
    }
  };

  const getGrowthIcon = (growth: number) => {
    return growth > 0 ? <FaArrowUp className="text-success" /> : <FaArrowDown className="text-danger" />;
  };

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Header className="bg-transparent border-0 pb-0">
        <h5 className="mb-0">
          <FaUsers className="text-info me-2" />
          Customer Segmentation Insights
        </h5>
      </Card.Header>
      <Card.Body>
        <div className="customer-segments">
          {data.map((segment, index) => (
            <div key={index} className="segment-item mb-4 p-3 border rounded">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0 fw-bold">{segment.segment}</h6>
                <Badge bg={getSegmentColor(segment.segment)} pill>
                  {segment.count} customers
                </Badge>
              </div>
              
              <Row className="mb-2">
                <Col xs={6}>
                  <small className="text-muted">Avg Order Value</small>
                  <div className="fw-bold">₹{segment.avgOrderValue.toLocaleString()}</div>
                </Col>
                <Col xs={6}>
                  <small className="text-muted">Purchase Frequency</small>
                  <div className="fw-bold">{segment.frequency}/month</div>
                </Col>
              </Row>
              
              <Row className="mb-2">
                <Col xs={6}>
                  <small className="text-muted">Loyalty Score</small>
                  <div className="d-flex align-items-center">
                    <ProgressBar 
                      variant={segment.loyalty > 80 ? 'success' : segment.loyalty > 60 ? 'warning' : 'danger'}
                      now={segment.loyalty} 
                      style={{ width: '60px', height: '8px' }}
                      className="me-2"
                    />
                    <span className="small">{segment.loyalty}%</span>
                  </div>
                </Col>
                <Col xs={6}>
                  <small className="text-muted">Growth</small>
                  <div className="d-flex align-items-center">
                    {getGrowthIcon(segment.growth)}
                    <span className="ms-1 fw-bold">{Math.abs(segment.growth)}%</span>
                  </div>
                </Col>
              </Row>
              
              <div className="insight-box bg-light p-2 rounded mt-2">
                <small className="text-primary">
                  <FaStar className="me-1" />
                  <strong>Insight:</strong> {segment.insight}
                </small>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CustomerInsights;
