import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import {
  ComposedChart,
  Bar,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { FaChartLine } from 'react-icons/fa';

interface MonthlyComparisonItem {
  month: string;
  current: number;
  previous: number;
  growth: number;
}

interface YearOverYearComparisonProps {
  data: MonthlyComparisonItem[];
}

const YearOverYearComparison: React.FC<YearOverYearComparisonProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow">
          <p className="fw-bold mb-2">{`${label} 2024`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="mb-1" style={{ color: entry.color }}>
              {entry.name === 'growth' 
                ? `${entry.name}: ${entry.value}%` 
                : `${entry.name}: ₹${Number(entry.value).toLocaleString()}`
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
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <FaChartLine className="text-primary me-2" />
            Year-over-Year Comparison
          </h5>
          <Badge bg="info" pill>Growth Trend</Badge>
        </div>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="previous" fill="#e0e0e0" name="Previous Year" />
            <Bar dataKey="current" fill="#007bff" name="Current Year" />
            <Line
              type="monotone"
              dataKey="growth"
              stroke="#28a745"
              strokeWidth={3}
              name="Growth %"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default YearOverYearComparison;
