interface PopupChildeProp {
  handleClose: () => void;
}
interface Section {
  name: string;
  code: string;
  description: string;
  _id?:string
}
interface Rack {
  name: string;
  code: string;
  description: string;
  section:string
  _id?:string
}
interface RackCreateBody{
  name: string;
  code: string;
  description: string;
  section:any
}