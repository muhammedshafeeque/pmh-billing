import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import {
  FaBullseye,
  FaCheckCircle,
  FaInfoCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

interface PerformanceMetricItem {
  metric: string;
  value: number;
  target: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning';
}

interface PerformanceMetricsProps {
  data: PerformanceMetricItem[];
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ data }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <FaCheckCircle className="text-success me-1" />;
      case 'good':
        return <FaInfoCircle className="text-info me-1" />;
      case 'warning':
        return <FaExclamationTriangle className="text-warning me-1" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'success';
      case 'good':
        return 'info';
      case 'warning':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Header className="bg-transparent border-0 pb-0">
        <h5 className="mb-0">
          <FaBullseye className="text-success me-2" />
          Performance Metrics
        </h5>
      </Card.Header>
      <Card.Body>
        <div className="performance-metrics" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {data.map((metric, index) => (
            <div key={index} className="metric-item mb-3 p-2 border rounded">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="fw-bold text-sm">{metric.metric}</span>
                <div className="d-flex align-items-center">
                  {getStatusIcon(metric.status)}
                  <Badge bg={getStatusColor(metric.status)}>
                    {metric.value}{metric.unit}
                  </Badge>
                </div>
              </div>
              <div className="progress" style={{ height: '4px' }}>
                <div
                  className={`progress-bar bg-${getStatusColor(metric.status)}`}
                  style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                ></div>
              </div>
              <small className="text-muted">Target: {metric.target}{metric.unit}</small>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PerformanceMetrics;
