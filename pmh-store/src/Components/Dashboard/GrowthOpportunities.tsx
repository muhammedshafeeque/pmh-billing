import React from 'react';
import { Card, Row, Col, Badge, Button } from 'react-bootstrap';
import { FaRocket, FaLightbulb, FaClock, FaDollarSign, FaChartLine } from 'react-icons/fa';

interface Opportunity {
  opportunity: string;
  potential: 'high' | 'medium' | 'low';
  investment: number;
  roi: number;
  timeline: string;
  description: string;
}

interface GrowthOpportunitiesProps {
  data: Opportunity[];
}

const GrowthOpportunities: React.FC<GrowthOpportunitiesProps> = ({ data }) => {
  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case 'high': return 'success';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getPotentialIcon = (potential: string) => {
    switch (potential) {
      case 'high': return <FaRocket className="text-success" />;
      case 'medium': return <FaChartLine className="text-warning" />;
      case 'low': return <FaClock className="text-secondary" />;
      default: return <FaClock className="text-secondary" />;
    }
  };

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Header className="bg-transparent border-0 pb-0">
        <h5 className="mb-0">
          <FaLightbulb className="text-warning me-2" />
          Growth Opportunities
        </h5>
      </Card.Header>
      <Card.Body>
        <div className="opportunities-list">
          {data.map((opportunity, index) => (
            <div key={index} className="opportunity-item mb-4 p-3 border rounded">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="d-flex align-items-center">
                  {getPotentialIcon(opportunity.potential)}
                  <h6 className="mb-0 ms-2 fw-bold">{opportunity.opportunity}</h6>
                </div>
                <Badge bg={getPotentialColor(opportunity.potential)} pill>
                  {opportunity.potential} potential
                </Badge>
              </div>
              
              <p className="text-muted small mb-3">{opportunity.description}</p>
              
              <Row className="mb-3">
                <Col xs={4}>
                  <div className="text-center">
                    <small className="text-muted d-block">Investment</small>
                    <div className="fw-bold text-primary">
                      <FaDollarSign className="me-1" />
                      ₹{(opportunity.investment / 1000).toFixed(0)}K
                    </div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="text-center">
                    <small className="text-muted d-block">Expected ROI</small>
                    <div className="fw-bold text-success">
                      {opportunity.roi}%
                    </div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="text-center">
                    <small className="text-muted d-block">Timeline</small>
                    <div className="fw-bold text-info">
                      {opportunity.timeline}
                    </div>
                  </div>
                </Col>
              </Row>
              
              <div className="d-flex justify-content-between align-items-center">
                <div className="roi-indicator">
                  <small className="text-muted">ROI Score: </small>
                  <Badge 
                    bg={opportunity.roi > 30 ? 'success' : opportunity.roi > 20 ? 'warning' : 'secondary'}
                  >
                    {opportunity.roi > 30 ? 'Excellent' : opportunity.roi > 20 ? 'Good' : 'Fair'}
                  </Badge>
                </div>
                <Button 
                  size="sm" 
                  variant="outline-primary"
                  className="px-3"
                >
                  Explore
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default GrowthOpportunities;
