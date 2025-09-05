import React from 'react';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
import { FaDownload, FaUpload, FaFileExcel } from 'react-icons/fa';

interface ExcelFileUploadProps {
  onFileChange: (file: File | null) => void;
  onUpload: () => void;
  onDownloadSample: () => void;
}

const ExcelFileUpload: React.FC<ExcelFileUploadProps> = ({
  onFileChange,
  onUpload,
  onDownloadSample,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileChange(event.target.files[0]);
    } else {
      onFileChange(null);
    }
  };

  return (
    <div className="excel-file-upload">
      <Card className="border-0">
        <Card.Body className="px-0">
          <div className="text-center mb-4">
            <FaFileExcel size={48} className="text-success mb-3" />
            <h5 className="mb-2">Upload Excel File</h5>
            <p className="text-muted">Select an Excel file to bulk upload categories</p>
          </div>

          <Form.Group controlId="formFile" className="mb-4">
            <Form.Label className="fw-semibold">Select Excel File</Form.Label>
            <Form.Control 
              type="file" 
              accept=".xlsx,.xls" 
              onChange={handleFileChange}
              className="form-control-lg"
            />
            <Form.Text className="text-muted">
              Supported formats: .xlsx, .xls
            </Form.Text>
          </Form.Group>

          <Row className="g-3">
            <Col md={6}>
              <Button 
                variant="outline-secondary" 
                onClick={onDownloadSample}
                className="w-100"
                size="lg"
              >
                <FaDownload className="me-2" />
                Download Sample
              </Button>
            </Col>
            <Col md={6}>
              <Button 
                variant="primary" 
                onClick={onUpload}
                className="w-100"
                size="lg"
              >
                <FaUpload className="me-2" />
                Upload File
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ExcelFileUpload;
