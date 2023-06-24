import "./App.scss";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import BillProvider from "./Context/BillContextProvider";
import { nav } from "./Constants/routes";

function App() {
  const Login = React.lazy(() => import("./Pages/Login/Login"));
  const Home = React.lazy(() => import("./Pages/Home/Home"));
  return (
    <div className="App">
      <Suspense>
        <BillProvider>
          <Routes>
            <Route path={nav.LOGIN} exact element={<Login />} />
            <Route path={nav.HOME} element={<Home />} />
          </Routes>
        </BillProvider>
      </Suspense>
    </div>
  );
}

export default App;
