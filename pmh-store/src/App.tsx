import React, { Suspense } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { ROUTERS } from "./Constants/Routes";
import Loading from "./Components/Load/Lod";
import Login from "./Pages/Login/Login";
import Header from "./Components/Header/Header";
import { usePmh } from "./Contexts/PmhContext";
import SideBar from "./Components/SideBar/SideBar";
import { SideBarItems } from "./Constants/SideBarMenu";
import Home from "./Pages/Home/Home";
import SectionList from "./Pages/Location/Section";
import RackList from "./Pages/Location/Rack";
import GroupeList from "./Pages/Stocks/Group";
import ItemsList from "./Pages/Stocks/Item";
import VendorList from "./Pages/Entity/Vender";
import AccountHeadList from "./Pages/Accounts/AccoutHead";
import AccountsList from "./Pages/Accounts/Accounts";
import StocksList from "./Pages/Stocks/Stocks";


const App: React.FC = () => {
  const { user } = usePmh();
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        {user ? (
          <>
            <Header />
            <div className="col-md-12 p-3">
              <div className="admin_area">
                <div className="col-md-12" style={{ display: "flex" }}>
                  <div className="col-md-2">
                    <SideBar items={SideBarItems} />
                  </div>
                  <div className="col-md-10">
                    <Routes>
                      <Route path={ROUTERS.HOME_ROUTER} element={<Home />} />
                      <Route path={ROUTERS.SECTION} element={<SectionList />} />
                      <Route path={ROUTERS.RACK} element={<RackList/>}/>
                      <Route path={ROUTERS.GROUPE} element={<GroupeList/>}/>
                      <Route path={ROUTERS.ITEM} element={<ItemsList/>}/>
                      <Route path={ROUTERS.VENDOR} element={<VendorList/>}/>
                      <Route path={ROUTERS.ACCOUNT_HEAD} element={<AccountHeadList/>}/>
                      <Route path={ROUTERS.ACCOUNTS} element={<AccountsList/>}/>
                      <Route path={ROUTERS.STOCK} element={<StocksList/>}/>
                    </Routes>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Routes>
              <Route path={ROUTERS.LOGIN_ROUTER} element={<Login />} />
            </Routes>
          </>
        )}
      </Suspense>
    </div>
  );
};

export default App;
