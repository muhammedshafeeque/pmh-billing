import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN } from "../Constants/constant";
import { nav } from "../Constants/routes";

const StoreContext = createContext();
const BillProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate=useNavigate()
  useEffect(()=>{
    let token=localStorage.getItem(TOKEN)
    if(!token){
      navigate(nav.HOME)
    }
  },[navigate])
  return (
    <StoreContext.Provider
      value={{
        user,
        setUser,
        
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export default BillProvider
export const Store = () => {
  return useContext(StoreContext);
};
