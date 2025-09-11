import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import {
  ComposedChart,
  Area,
  Bar,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { FaChartArea } from 'react-icons/fa';

interface SalesDataItem {
  month: string;
  sales: number;
  profit: number;
  orders: number;
  customers: number;
  [key: string]: any;
}

interface SalesTrendChartProps {
  data: SalesDataItem[];
}

const SalesTrendChart: React.FC<SalesTrendChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow">
          <p className="fw-bold mb-2">{`${label} 2024`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="mb-1" style={{ color: entry.color }}>
              {`${entry.name}: ${
                entry.name === 'Sales' || entry.name === 'Profit'
                  ? `₹${Number(entry.value).toLocaleString()}`
                  : entry.value
              }`}
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
            <FaChartArea className="text-primary me-2" />
            Sales & Profit Trend
          </h5>
          <Badge bg="success" pill>
            +16.7% Growth
          </Badge>
        </div>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="sales"
              fill="rgba(0, 123, 255, 0.1)"
              stroke="#007bff"
              strokeWidth={2}
              name="Sales"
            />
            <Bar dataKey="profit" fill="#28a745" name="Profit" />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#ff8042"
              strokeWidth={2}
              name="Orders"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default SalesTrendChart;
