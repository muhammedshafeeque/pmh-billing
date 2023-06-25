import "./App.scss";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { nav } from "./Constants/routes";
import BlockUi from "./Components/BlockUi/BlockUi";
import { Stor } from "./Context/BillerContext";

function App() {
  const {blockUi}=Stor()
  const Login = React.lazy(() => import("./Pages/Login/Login"));
  const Home = React.lazy(() => import("./Pages/Home/Home"));
  return (
    <div className="App">
      <BlockUi block={blockUi} />
      <Suspense fallback={<BlockUi block={BlockUi} />}>
        <Routes>
          <Route path={nav.LOGIN} exact element={<Login />} />
          <Route path={nav.HOME} element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
