export interface Item {
  _id?: string;
  name: string;
  description?: string;
  group?: {
    _id?: string;
    name: string;
  };
}
