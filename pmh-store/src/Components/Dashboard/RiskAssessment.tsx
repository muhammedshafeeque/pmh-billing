import React from 'react';
import { Card, Row, Col, Badge, ProgressBar } from 'react-bootstrap';
import { FaExclamationTriangle, FaShieldAlt, FaClock, FaLightbulb } from 'react-icons/fa';

interface Risk {
  risk: string;
  level: 'high' | 'medium' | 'low';
  impact: 'financial' | 'operational' | 'market' | 'reputational';
  probability: number;
  mitigation: string;
  timeline: string;
}

interface RiskAssessmentProps {
  data: Risk[];
}

const RiskAssessment: React.FC<RiskAssessmentProps> = ({ data }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'financial': return <FaShieldAlt className="text-danger" />;
      case 'operational': return <FaClock className="text-warning" />;
      case 'market': return <FaExclamationTriangle className="text-info" />;
      case 'reputational': return <FaShieldAlt className="text-secondary" />;
      default: return <FaExclamationTriangle className="text-secondary" />;
    }
  };

  const getTimelineColor = (timeline: string) => {
    switch (timeline) {
      case 'immediate': return 'danger';
      case 'quarterly': return 'warning';
      case 'ongoing': return 'info';
      case 'preventive': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Header className="bg-transparent border-0 pb-0">
        <h5 className="mb-0">
          <FaExclamationTriangle className="text-warning me-2" />
          Risk Assessment
        </h5>
      </Card.Header>
      <Card.Body>
        <div className="risk-list">
          {data.map((risk, index) => (
            <div key={index} className="risk-item mb-4 p-3 border rounded">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="d-flex align-items-center">
                  {getImpactIcon(risk.impact)}
                  <h6 className="mb-0 ms-2 fw-bold">{risk.risk}</h6>
                </div>
                <div className="d-flex gap-2">
                  <Badge bg={getRiskColor(risk.level)} pill>
                    {risk.level} risk
                  </Badge>
                  <Badge bg="secondary" pill>
                    {risk.impact}
                  </Badge>
                </div>
              </div>
              
              <Row className="mb-3">
                <Col xs={6}>
                  <small className="text-muted">Probability</small>
                  <div className="d-flex align-items-center">
                    <ProgressBar 
                      variant={risk.probability > 70 ? 'danger' : risk.probability > 40 ? 'warning' : 'success'}
                      now={risk.probability} 
                      style={{ width: '80px', height: '8px' }}
                      className="me-2"
                    />
                    <span className="small fw-bold">{risk.probability}%</span>
                  </div>
                </Col>
                <Col xs={6}>
                  <small className="text-muted">Timeline</small>
                  <div>
                    <Badge bg={getTimelineColor(risk.timeline)} pill>
                      {risk.timeline}
                    </Badge>
                  </div>
                </Col>
              </Row>
              
              <div className="mitigation-box bg-light p-2 rounded">
                <small className="text-primary">
                  <FaLightbulb className="me-1" />
                  <strong>Mitigation:</strong> {risk.mitigation}
                </small>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default RiskAssessment;
