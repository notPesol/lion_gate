import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import { Route, Routes } from "react-router-dom";
import Stage from "./pages/Admin/Stage";
import StageDetail from "./pages/Admin/StageDetail";
import Alert from "./components/Alert";
import { hideUi } from "./redux/slices/uiSlice";

const App = () => {
  const auth = useSelector((state) => state.auth);
  const ui = useSelector((state) => state.ui);
  const { status, message } = ui;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (ui.status !== "idle") {
      setTimeout(() => {
        dispatch(hideUi());
      }, 5000);
    }
  }, [ui.status]);

  useEffect(() => {
    if (auth?.token && auth?.isAdmin) {
      navigate("/admin");
    }
  }, [auth?.token]);

  return (
    <>
      {status !== "idle" && <Alert status={status} message={message} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Layout auth={auth} />}>
          <Route path="" element={<Admin auth={auth} />}>
            <Route path="stage" element={<Stage />} />
            <Route path="stage/:id" element={<StageDetail />} />
            <Route path="round" element={<Stage />} />
            <Route path="animal" element={<Stage />} />
          </Route>
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </>
  );
};

export default App;
