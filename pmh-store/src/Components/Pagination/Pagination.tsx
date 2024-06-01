import React from 'react';
import { Pagination } from 'react-bootstrap';

interface PaginationComponentProps {
  limit: number;
  totalCount: number;
  skip: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ limit, totalCount, skip, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / limit);
  let currentPage = Math.floor(skip / limit) + 1;
  
  if (isNaN(currentPage) || currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  
  const pages = [];

  // Generate page numbers
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => onPageChange(i)}>
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => onPageChange(1)} />
      <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
      {pages}
      <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      <Pagination.Last onClick={() => onPageChange(totalPages)} />
    </Pagination>
  );
};

export default PaginationComponent;
