import { useState } from "react";
import { Alert } from "react-bootstrap";
import ExcelFileUpload from "../ExcelFileUpload/ExcelFileUpload";
import axios from "../../Api/Api";
import { useToastService } from "../../Contexts/ToastContext";
import { convertArrayBufferExcel } from "../../Utils/ExcelUtility";
import { useLoading } from "../../Contexts/LoaderContext";
const CategoryBulkUpload: React.FC<PopupChildeProp> = ({ handleClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { showAlertMessage } = useToastService();
  const { setLoadingState } = useLoading();
  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      showAlertMessage("Please Select A File", "error");
      return;
    }
    setLoadingState(true);
    const formData = new FormData();
    formData.append("files", selectedFile);

    try {
      await axios.post("/stock/category-excel-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      handleClose();
    } catch (error: any) {
      if (error.response.data.file) {
        convertArrayBufferExcel(
          error.response.data,
          "Category Upload Error File"
        );
      }
    } finally {
      setLoadingState(false);
    }
  };

  const handleDownloadSample = async() => {
    try {
      setLoadingState(true);
      let {data}=await axios('/stock/category-excel-sample-file')
      convertArrayBufferExcel(
        data,
        "Category Sample File"
      );
    } catch (error) {
      
    }finally{
      setLoadingState(false);
    }
  };

  return (
    <div className="category-bulk-upload">
      <Alert variant="info" className="mb-4">
        <Alert.Heading className="h6 mb-2">
          📋 Instructions for Bulk Upload
        </Alert.Heading>
        <ul className="mb-0 small">
          <li>Download the sample file to see the correct format</li>
          <li>Fill in your category data following the same structure</li>
          <li>Upload the completed Excel file</li>
          <li>Any errors will be downloaded as an error report file</li>
        </ul>
      </Alert>

      <ExcelFileUpload
        onFileChange={handleFileChange}
        onUpload={handleUpload}
        onDownloadSample={handleDownloadSample}
      />
    </div>
  );
};

export default CategoryBulkUpload;
