import React, { Suspense } from "react";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";
import { Route, Routes } from "react-router-dom";
import { mainRoutes } from "../../Constants/routes";
import BlockUi from "../../Components/BlockUi/BlockUi";
function Home() {
  const Home = React.lazy(() => import("../../Modules/Home/Dashboard"));
  const ShopConfig = React.lazy(() => import("../../Modules/Shop/ShopConfig"));
  const Section = React.lazy(() => import("../../Modules/Shop/Section"));
  const Rack = React.lazy(() => import("../../Modules/Shop/Racks"));
  return (
    <div>
      <Header />
      <div className="row col-md-12">
        <div className="col-md-2">
          <Sidebar />
        </div>

        <div className="col-md-10">
          <Suspense fallback={<BlockUi />}>
            <Routes>
              <Route path={mainRoutes.home} element={<Home />} />
              <Route path={mainRoutes.shopConfig} element={<ShopConfig />} />
              <Route path={mainRoutes.section} element={<Section />} />
              <Route path={mainRoutes.rack} element={<Rack />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Home;
