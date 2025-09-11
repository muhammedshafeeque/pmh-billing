import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { FaChartLine, FaArrowUp } from 'react-icons/fa';

interface ForecastItem {
  month: string;
  predicted: number;
  confidence: number;
  factors: string[];
}

interface SalesForecastProps {
  data: ForecastItem[];
}

const SalesForecast: React.FC<SalesForecastProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item = data.find(d => d.month === label);
      return (
        <div className="bg-white p-3 border rounded shadow">
          <p className="fw-bold mb-2">{label}</p>
          <p className="mb-1 text-primary">
            Predicted: ₹{Number(payload[0].value).toLocaleString()}
          </p>
          <p className="mb-1 text-info">
            Confidence: {item?.confidence}%
          </p>
          <div className="mt-2">
            <small className="text-muted">Key Factors:</small>
            {item?.factors.map((factor, index) => (
              <div key={index} className="small text-success">• {factor}</div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const avgGrowth = ((data[data.length - 1]?.predicted - data[0]?.predicted) / data[0]?.predicted * 100).toFixed(1);

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Header className="bg-transparent border-0 pb-0">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <FaChartLine className="text-primary me-2" />
            Sales Forecast 2025
          </h5>
          <Badge bg="success" pill>
            <FaArrowUp className="me-1" />
            +{avgGrowth}% Growth
          </Badge>
        </div>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#007bff" 
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: '#007bff', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="mt-3">
          <Row>
            <Col xs={6}>
              <div className="text-center">
                <h6 className="text-muted mb-1">Avg Confidence</h6>
                <h5 className="text-info mb-0">
                  {Math.round(data.reduce((sum, item) => sum + item.confidence, 0) / data.length)}%
                </h5>
              </div>
            </Col>
            <Col xs={6}>
              <div className="text-center">
                <h6 className="text-muted mb-1">Q1 Target</h6>
                <h5 className="text-success mb-0">
                  ₹{Math.round(data.reduce((sum, item) => sum + item.predicted, 0) / 1000)}K
                </h5>
              </div>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SalesForecast;
