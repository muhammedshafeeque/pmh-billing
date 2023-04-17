import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./Pages/Login";
import { nav } from "./Constants/routes";
import React, { Suspense } from "react";
import BillProvider from "./Context/Context";

function App() {
  const Dashboard = React.lazy(() => import("./app/DashBoard/Dashboard"));
  const Stock=React.lazy(()=>import('./app/Stock/Stock'))
  return (
    <div className="App">
      <Suspense>
        <BillProvider>
          <Routes>
            <Route path={nav.HOME} exact element={<Login />} />
            <Route path={nav.DASHBOARD} element={<Dashboard />} />
            <Route path={nav.STOCK} element={<Stock />} />
          </Routes>
        </BillProvider>
      </Suspense>
    </div>
  );
}

export default App;
