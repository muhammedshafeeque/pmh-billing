import React from 'react';
import { Pagination, Form } from 'react-bootstrap';
import { FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import './Pagination.scss';

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
  
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const handlePageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onPageChange(Number(event.target.value));
  };

  return (
    <div className="pagination-wrapper">
      <Pagination className="custom-pagination">
        <Pagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1}>
          <FaAngleDoubleLeft />
        </Pagination.First>
        <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          <FaAngleLeft />
        </Pagination.Prev>
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <Pagination.Ellipsis key={`ellipsis-${index}`} />
          ) : (
            <Pagination.Item
              key={`page-${page}`}
              active={page === currentPage}
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </Pagination.Item>
          )
        ))}
        <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          <FaAngleRight />
        </Pagination.Next>
        <Pagination.Last onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
          <FaAngleDoubleRight />
        </Pagination.Last>
      </Pagination>
      <div className="pagination-info">
        <span>Page {currentPage} of {totalPages}</span>
        <Form.Select
          className="page-select"
          value={currentPage}
          onChange={handlePageSelect}
          aria-label="Select page"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <option key={page} value={page}>
              Page {page}
            </option>
          ))}
        </Form.Select>
      </div>
    </div>
  );
};

export default PaginationComponent;
