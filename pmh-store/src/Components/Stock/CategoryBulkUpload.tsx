import { useState } from "react";
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
    <div>
      <ExcelFileUpload
        onFileChange={handleFileChange}
        onUpload={handleUpload}
        onDownloadSample={handleDownloadSample}
      />
    </div>
  );
};

export default CategoryBulkUpload;
