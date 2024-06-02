import React from 'react';
import { Button, Form } from 'react-bootstrap';

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
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Select Excel File</Form.Label>
        <Form.Control type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      </Form.Group>
      
      <Button variant="secondary" size='sm' style={{marginRight:"10px"}} onClick={onDownloadSample}>
        Download Sample
      </Button>
      <Button variant="primary" onClick={onUpload} size='sm' className="mr-2">
        Upload
      </Button>
    </div>
  );
};

export default ExcelFileUpload;
