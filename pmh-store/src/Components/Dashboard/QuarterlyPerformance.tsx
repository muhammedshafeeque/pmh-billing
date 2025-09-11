import React from 'react';
import { Card } from 'react-bootstrap';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { FaChartBar } from 'react-icons/fa';

interface QuarterlyDataItem {
  quarter: string;
  revenue: number;
  profit: number;
  orders: number;
  avgGrowth: number;
}

interface QuarterlyPerformanceProps {
  data: QuarterlyDataItem[];
}

const QuarterlyPerformance: React.FC<QuarterlyPerformanceProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow">
          <p className="fw-bold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="mb-1" style={{ color: entry.color }}>
              {entry.name === 'avgGrowth' 
                ? `${entry.name}: ${entry.value}%` 
                : `${entry.name}: ${Number(entry.value).toLocaleString()}`
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
          <FaChartBar className="text-warning me-2" />
          Quarterly Performance
        </h5>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="quarter" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="revenue" fill="#007bff" name="Revenue" />
            <Bar dataKey="profit" fill="#28a745" name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default QuarterlyPerformance;
