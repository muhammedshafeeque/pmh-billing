import React from 'react';
import { Card, ProgressBar, Badge } from 'react-bootstrap';
import { FaWarehouse, FaExclamationTriangle } from 'react-icons/fa';

interface StockAlertItem {
  product: string;
  current: number;
  minimum: number;
  status: 'critical' | 'low' | 'warning';
}

interface StockAlertsProps {
  data: StockAlertItem[];
}

const StockAlerts: React.FC<StockAlertsProps> = ({ data }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'danger';
      case 'low':
        return 'warning';
      case 'warning':
        return 'info';
      default:
        return 'secondary';
    }
  };

  const getProgressVariant = (current: number, minimum: number) => {
    const percentage = (current / minimum) * 100;
    if (percentage <= 25) return 'danger';
    if (percentage <= 50) return 'warning';
    if (percentage <= 75) return 'info';
    return 'success';
  };

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Header className="bg-transparent border-0 pb-0">
        <h5 className="mb-0">
          <FaWarehouse className="text-danger me-2" />
          Stock Alerts
        </h5>
      </Card.Header>
      <Card.Body>
        <div className="stock-alerts">
          {data.map((item, index) => (
            <div key={index} className="stock-alert-item mb-3 pb-3 border-bottom">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="d-flex align-items-center">
                  {item.status === 'critical' && (
                    <FaExclamationTriangle className="text-danger me-2" />
                  )}
                  <span className="fw-bold text-sm">{item.product}</span>
                </div>
                <Badge bg={getStatusColor(item.status)} pill>
                  {item.status}
                </Badge>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <small className="text-muted">
                  Current: {item.current} | Min: {item.minimum}
                </small>
                <small className="text-muted">
                  {Math.round((item.current / item.minimum) * 100)}%
                </small>
              </div>
              <ProgressBar
                variant={getProgressVariant(item.current, item.minimum)}
                now={(item.current / item.minimum) * 100}
                style={{ height: '6px' }}
              />
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StockAlerts;
