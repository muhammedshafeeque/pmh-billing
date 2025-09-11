import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import {
  FaFileInvoice,
  FaShoppingCart,
  FaUsers,
  FaBox,
  FaClock
} from 'react-icons/fa';

interface RecentActivityItem {
  type: 'sale' | 'order' | 'customer' | 'product';
  description: string;
  time: string;
  amount?: number;
}

interface RecentActivitiesProps {
  data: RecentActivityItem[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ data }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'sale':
        return <FaFileInvoice className="text-success" />;
      case 'order':
        return <FaShoppingCart className="text-primary" />;
      case 'customer':
        return <FaUsers className="text-info" />;
      case 'product':
        return <FaBox className="text-warning" />;
      default:
        return <FaClock className="text-muted" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'sale':
        return 'success';
      case 'order':
        return 'primary';
      case 'customer':
        return 'info';
      case 'product':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Header className="bg-transparent border-0 pb-0">
        <h5 className="mb-0">
          <FaClock className="text-info me-2" />
          Recent Activities
        </h5>
      </Card.Header>
      <Card.Body>
        <div className="activity-list">
          {data.map((activity, index) => (
            <div key={index} className="activity-item d-flex align-items-center mb-3 pb-3 border-bottom">
              <div className="activity-icon me-3">
                {getIcon(activity.type)}
              </div>
              <div className="flex-grow-1">
                <p className="mb-1 text-sm">{activity.description}</p>
                <div className="d-flex align-items-center justify-content-between">
                  <small className="text-muted">{activity.time}</small>
                  <div className="d-flex align-items-center">
                    {activity.amount && (
                      <span className="text-success fw-bold me-2">
                        ₹{Number(activity.amount).toLocaleString()}
                      </span>
                    )}
                    <Badge bg={getBadgeColor(activity.type)} pill>
                      {activity.type}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecentActivities;
