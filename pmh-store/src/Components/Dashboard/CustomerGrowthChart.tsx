import React from 'react';
import { Card } from 'react-bootstrap';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { FaUsers } from 'react-icons/fa';

interface SalesDataItem {
  month: string;
  customers: number;
  newCustomers?: number;
  [key: string]: any;
}

interface CustomerGrowthChartProps {
  data: SalesDataItem[];
}

const CustomerGrowthChart: React.FC<CustomerGrowthChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow">
          <p className="fw-bold mb-2">{`${label} 2024`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="mb-1" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
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
          <FaUsers className="text-success me-2" />
          Customer Growth
        </h5>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="customers"
              stroke="#28a745"
              fill="rgba(40, 167, 69, 0.2)"
              strokeWidth={2}
              name="Total Customers"
            />
            {data[0]?.newCustomers && (
              <Area
                type="monotone"
                dataKey="newCustomers"
                stroke="#17a2b8"
                fill="rgba(23, 162, 184, 0.2)"
                strokeWidth={2}
                name="New Customers"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default CustomerGrowthChart;
