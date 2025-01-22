import axios from "../../Api/Api";

export const getCustomerById=async(id:string)=>{
    try {
        let customer = await axios.get(`/entity/customer/${id}`);
        return customer.data;
    } catch (error) {
        console.error("Error fetching Customer:", error);
        throw error;
    }
}
export const createCustomer=async(data:any)=>{
    try {
        let customer = await axios.post(`/entity/customer/`,data);
        return customer.data;
    } catch (error) {
        console.error("Error fetching Customer:", error);
        throw error;
    }
}
export const updateCustomer=async(data:any,id:string)=>{
    try {
        let customer = await axios.patch(`/entity/customer/${id}`,data);
        return customer.data;
    } catch (error) {
        throw error;
        
    }
}
export const deleteCustomer=async(id:string)=>{
    try {
        let customer = await axios.delete(`/entity/customer/${id}`);
        return customer.data;
    } catch (error) {
        throw error;
    }
}

export const downloadCustomerSampleFile=async()=>{
    try {
        let customer = await axios.get(`/entity/customer-excel-sample-file`);
        return customer.data;
    } catch (error) {
        throw error;
    }
}

export const bulkUploadCustomer=async(file:File)=>{
    try {
        let formData=new FormData();
        formData.append("file",file);
        let customer = await axios.post(`/entity/bulk-upload-customer`,formData,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        return customer.data;
    } catch (error) {
        throw error;
    }
}
