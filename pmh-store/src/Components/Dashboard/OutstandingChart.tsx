import React from 'react';
import { Card } from 'react-bootstrap';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { FaExclamationCircle } from 'react-icons/fa';

interface SalesDataItem {
  month: string;
  outstandingAmount?: number;
  [key: string]: any;
}

interface OutstandingChartProps {
  data: SalesDataItem[];
}

const OutstandingChart: React.FC<OutstandingChartProps> = ({ data }) => {
  // Filter data to only include months with outstanding amounts
  const outstandingData = data.filter(item => item.outstandingAmount !== undefined);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow">
          <p className="fw-bold mb-2">{`${label} 2024`}</p>
          <p className="mb-0 text-warning">
            Outstanding: ₹{Number(payload[0].value).toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Header className="bg-transparent border-0 pb-0">
        <h5 className="mb-0">
          <FaExclamationCircle className="text-warning me-2" />
          Outstanding Amount Trend
        </h5>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={outstandingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="outstandingAmount" 
              stroke="#ffc107" 
              strokeWidth={3}
              strokeDasharray="5 5"
              name="Outstanding Amount"
              dot={{ fill: '#ffc107', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default OutstandingChart;
