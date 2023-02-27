import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/Login";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>

      {/* <Outlet /> */}
    </div>
  );
};

export default App;
