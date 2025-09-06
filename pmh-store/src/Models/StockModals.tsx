export interface Unit {
    _id: string;
    unitCode: string;
    unitName: string;
    description: string;
    measurement: string;
    iso: string;
    conversionToParent: number;
    parentUnit: string;
  }
  
  export interface Rack {
    _id: string;
    name: string;
    code: string;
    section: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface Category {
    _id: string;
    name: string;
    code: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  export interface Item {
    _id: string;
  name: string;
  code: string;
  unit: Unit;
  totalStock: number;
  accountHead: string;
  racks: Rack[];
  category: Category;
  __v: number;
  createdAt: string;
  updatedAt: string;
  categoryName: string;
  unitCode: string;
  measurement: string;
  }