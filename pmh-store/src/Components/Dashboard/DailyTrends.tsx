import React from 'react';
import { Card } from 'react-bootstrap';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { FaClock } from 'react-icons/fa';

interface DailyTrendItem {
  day: string;
  orders: number;
  revenue: number;
  avgOrderValue: number;
}

interface DailyTrendsProps {
  data: DailyTrendItem[];
}

const DailyTrends: React.FC<DailyTrendsProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow">
          <p className="fw-bold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="mb-1" style={{ color: entry.color }}>
              {entry.name === 'avgOrderValue' 
                ? `${entry.name}: ₹${entry.value}` 
                : `${entry.name}: ${entry.value}`
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Header className="bg-transparent border-0 pb-0">
        <h5 className="mb-0">
          <FaClock className="text-info me-2" />
          Daily Performance Trends
        </h5>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#ff8042" strokeWidth={2} name="Orders" />
            <Line type="monotone" dataKey="avgOrderValue" stroke="#8884d8" strokeWidth={2} name="AOV" />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default DailyTrends;
