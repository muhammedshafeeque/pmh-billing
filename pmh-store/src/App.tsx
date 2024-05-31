import React, { Suspense } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";

import { ROUTERS } from "./Constants/Routes";
import Loading from "./Components/Load/Lod";
import Login from "./Pages/Login/Login";

// const Home = React.lazy(() => import("./Pages/Home/Home"));

const App: React.FC = () => {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
     
          <Routes>
         
            <Route path={ROUTERS.LOGIN_ROUTER} element={<Login />} />
               {/* <Route path={ROUTERS.HOME_ROUTER} element={<Home />} /> */}
          </Routes>
    
      </Suspense>
    </div>
  );
};

export default App;
