import { ACCOUNT_HEAD } from "../Models/AccountHead.js";
import { CUSTOMER } from "../Models/CustomerModal.js";
import { VENDOR } from "../Models/VendorModal.js";
import { createAccountHead, deleteAccountHead } from "../Service/AccountsService.js";
import { ExcelDataExtractor, extractDataFromCSV, extractDataFromVCF, generateErrorExcelBlob, generateExcelBlob, queryGen, uploadFile } from "../Utils/utils.js";

export const createVendor = async (req, res, next) => {
  let createdAccountHead = null;
  try {
    createdAccountHead = await createAccountHead({
      name: req.body.name,
      credit: Number(req.body.accountBallance),
      type: "payable",
    });
    req.body.accountHEad = createdAccountHead._id;
    const createdVendor = await VENDOR.create(req.body);
    res.status(201).send({ message: "Vendor Created Successfully", vendor: createdVendor });
  } catch (error) {
    if (createdAccountHead) {
      try {
        await deleteAccountHead(createdAccountHead._id);
      } catch (deleteError) {
        console.error("Error deleting account head:", deleteError);
      }
    }
    next(error);
  }
};

export const createCustomer = async (req, res, next) => {
  try {
    let accountHEad = await createAccountHead({
      name: req.body.firstName,
      credit: Number(req.body.accountBallance),
      type: "receivable",
    });
    let customer={
      firstName:req.body.firstName,
      phone:req.body.phone,
      accountHEad:accountHEad._id

    }
    await CUSTOMER.create(customer);
    res.send({ message: "Customer  Created Successfully" });
  } catch (error) {
    next(error);
  }
};
export const uploadBulkCustomers = async (req, res, next) => {
  try {
    if (!req.files) {
      return next({ status: 400, message: "No file uploaded" });
    }
    const file = await uploadFile(req.files);
    const fileExtension = file.filename.split('.').pop().toLowerCase();
    let customers = [];
    switch (fileExtension) {
      case 'xls':
      case 'xlsx':
        customers = await ExcelDataExtractor(file);
        break;
      case 'csv':
        customers = await extractDataFromCSV(file);
        break;
      case 'vcf':
        customers = await extractDataFromVCF(file);
        break;
      default:
        return next({ status: 400, message: "Unsupported file format" });
    }
    let duplicates = new Map();
    await Promise.all(
      customers.map(async (customer) => {
        let  isExist=await CUSTOMER.findOne({phone:customer.phone})
        if(isExist){
          duplicates.set(customer.phone, customer)
        }}))
    if (duplicates.size > 0) {
      let errorData = [];
      customers = customers.forEach(element => {
        if(duplicates.has(element.phone)){
          errorData.push({item:element,success:false,error:{message:'Customer Already Exist'}})
        }else{
          errorData.push({item:element,success:true})
        }
      });
      const buffer = await generateErrorExcelBlob(errorData);
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=error_report.xlsx"
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.status(400).send({
        file: buffer,
      });
    }else{
      await Promise.all(
        customers.map(async (customer) => {
          let accountHead= await createAccountHead({
            name: customer.name,
            debit: 0,
            type: "receivable",
          })
          customer.accountHEad=accountHead._id
          customer.firstName=customer.name
        })
      );
      let Customers=await CUSTOMER.insertMany(customers)
      res.send({ message: "Customers Uploaded Successfully", Customers });
    }  
  } catch (error) {
    next(error);
  }
}
export const customerExcelSampleFile = async (req, res, next) => {
  try {
      let data = [{ name: "sample", phone: "SAM", email: "example@example.com", accountBalance: 0 }];
      const buffer = await generateExcelBlob(data);
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=error_report.xlsx"
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.status(200).send({
        file: buffer,
      });
    } catch (error) {
      next(error);
    }
}

export const getVendors = async (req, res, next) => {
  try {
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let keywords = await queryGen(req.query);
    let results = await VENDOR.find(keywords)
      .sort({ createdAt: -1 })
      .populate("accountHEad")
      .limit(limit)
      .skip(skip);
    let count = await VENDOR.find(keywords).count();
    results = results.map((result) => ({
      ...result.toObject(),
      accountBallance: result.accountHEad.accountBalance,
      accountHEad: result.accountHEad.name,
    }));
    res.send({ results, count });
  } catch (error) {
    next(error);
  }
};

export const getCustomers = async (req, res, next) => {
  try {
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let keywords = await queryGen(req.query);
    let customers = await CUSTOMER.find(keywords)
      .populate("accountHEad")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    let count = await CUSTOMER.find(keywords).count();
    customers = customers.map((result) => ({
      ...result.toObject(),
      accountBallance: result.accountHEad.accountBalance,
      accountHEad: result.accountHEad.name,
    }));
    res.send({ count, results: customers });
  } catch (error) {
    next(error);
  }
};

export const createNewCustomerFromInvoice = async (req, res, next) => {
  try {
    req.body.firstName=req.body.name
    let  custExist=await CUSTOMER.findOne({phone:req.body.phone})
    if(custExist){
      next({status:400,message:'Customer Already Exist in same number'})
    }else{
      let accountHEad = await createAccountHead({
        name: req.body.firstName,
        debit: 0,
        type: "receivable",
      });
      let customer = {
        firstName: req.body.firstName,
        accountHEad: accountHEad._id,
       
        address: req.body.address,
        phone: req.body.phone,
        lastName: "s",
      };
      let CUS= await CUSTOMER.create(customer);
      res.send({ message: "new customer Added", response: CUS });
    }
    
  } catch (error) {
    next(error);
  }
};
export const deleteCustomer = async (req, res, next) => {
  try {
    let customer = await CUSTOMER.findById(req.params.id).populate('accountHEad');
    console.log(customer);
    
    if (!customer) return next({ status: 400, message: 'Customer Not Found' });
    
    if (customer.accountHEad.accountBalance !== 0) {
      return next({ status: 400, message: 'Need to clear Account Balance to perform this action' });
    }

    await CUSTOMER.findByIdAndDelete(req.params.id);
    await ACCOUNT_HEAD.findByIdAndDelete(customer.accountHEad._id)
    
    return res.status(200).json({ message: "Customer Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
export const updateCustomer=async(req,res,next)=>{
  try {
    let customer=await CUSTOMER.findByIdAndUpdate(req.params.id)
    if(!customer) return next({ status: 400, message: 'Customer Not Found' });

    let Customer=await CUSTOMER.findByIdAndUpdate(req.params.id,
      {
        $set:{firstName:req.body.firstName,phone:req.body.phone}
      }
    )
    res.status(200).json({ message: "Customer Updated Successfully" ,customer:Customer});
  } catch (error) {
    next(error)
  }
}


export const updateVendor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedVendor = await VENDOR.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json(updatedVendor);
  } catch (error) {
    next(error);
  }
};

export const deleteVendor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedVendor = await VENDOR.findByIdAndDelete(id);

    if (!deletedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    next(error);
  }
};
export const retrieveCustomer=async(req,res,next)=>{
  console.log("retrieving")
  try {
    let customer=await CUSTOMER.findById(req.params.id).populate('accountHEad')
    res.send(customer)
  } catch (error) {
    next(error)
  }
}
