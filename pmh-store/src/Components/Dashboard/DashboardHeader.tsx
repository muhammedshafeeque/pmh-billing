import React from 'react';
import { Row, Col, Dropdown, Button } from 'react-bootstrap';
import {
  FaCalendarAlt,
  FaDownload,
  FaSyncAlt
} from 'react-icons/fa';

interface DashboardHeaderProps {
  dateRange: string;
  setDateRange: (range: string) => void;
  refreshing: boolean;
  handleRefresh: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  dateRange,
  setDateRange,
  refreshing,
  handleRefresh
}) => {
  return (
    <Row className="mb-4">
      <Col>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="mb-1">Business Dashboard</h2>
            <p className="text-muted mb-0">
              Welcome back! Here's what's happening with your business today.
            </p>
          </div>
          <div className="d-flex gap-2">
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" size="sm">
                <FaCalendarAlt className="me-1" />
                Last {dateRange} days
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setDateRange('7')}>Last 7 days</Dropdown.Item>
                <Dropdown.Item onClick={() => setDateRange('30')}>Last 30 days</Dropdown.Item>
                <Dropdown.Item onClick={() => setDateRange('90')}>Last 90 days</Dropdown.Item>
                <Dropdown.Item onClick={() => setDateRange('365')}>Last year</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
            <Button
              variant="outline-success"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <FaSyncAlt className={`me-1 ${refreshing ? 'fa-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            
            <Button variant="outline-info" size="sm">
              <FaDownload className="me-1" />
              Export
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default DashboardHeader;
