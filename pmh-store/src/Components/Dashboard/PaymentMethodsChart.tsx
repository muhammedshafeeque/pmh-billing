import React from 'react';
import { Card } from 'react-bootstrap';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { FaCreditCard } from 'react-icons/fa';

interface PaymentMethodItem {
  method: string;
  amount: number;
  percentage: number;
}

interface PaymentMethodsChartProps {
  data: PaymentMethodItem[];
}

const PaymentMethodsChart: React.FC<PaymentMethodsChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded shadow">
          <p className="fw-bold mb-2">{label}</p>
          <p className="mb-1">{`Amount: ₹${Number(data.amount).toLocaleString()}`}</p>
          <p className="mb-0">{`Share: ${data.percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Header className="bg-transparent border-0 pb-0">
        <h5 className="mb-0">
          <FaCreditCard className="text-warning me-2" />
          Payment Methods
        </h5>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="method" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="amount" fill="#ffc107" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default PaymentMethodsChart;
