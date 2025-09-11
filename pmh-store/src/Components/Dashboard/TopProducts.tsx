import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { FaBox } from 'react-icons/fa';

interface TopProductItem {
  name: string;
  sales: number;
  revenue: number;
  growth: number;
}

interface TopProductsProps {
  data: TopProductItem[];
}

const TopProducts: React.FC<TopProductsProps> = ({ data }) => {
  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Header className="bg-transparent border-0 pb-0">
        <h5 className="mb-0">
          <FaBox className="text-primary me-2" />
          Top Products
        </h5>
      </Card.Header>
      <Card.Body>
        <div className="table-responsive">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Product</th>
                <th>Sales</th>
                <th>Revenue</th>
                <th>Growth</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, index) => (
                <tr key={index}>
                  <td className="fw-bold">{product.name}</td>
                  <td>{product.sales}</td>
                  <td>₹{Number(product.revenue).toLocaleString()}</td>
                  <td>
                    <Badge
                      bg={product.growth > 0 ? 'success' : 'danger'}
                      pill
                    >
                      {product.growth > 0 ? '+' : ''}{product.growth}%
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TopProducts;
