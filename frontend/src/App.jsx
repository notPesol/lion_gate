import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import { Route, Routes, useNavigate } from "react-router-dom";
import Stage from "./pages/Admin/Stage";
import CreateStage from "./pages/Admin/Stage/CreateStage";
import EditStage from "./pages/Admin/Stage/EditStage";
import Alert from "./components/Alert";
import { hideUi } from "./redux/slices/uiSlice";
import Animal from "./pages/Admin/Animal";
import CreateAnimal from "./pages/Admin/Animal/CreateAnimal";
import EditAnimal from "./pages/Admin/Animal/EditAnimal";
import Round from "./pages/Admin/Round";
import CreateRound from "./pages/Admin/Round/CreateRound";
import EditRound from "./pages/Admin/Round/EditRound";

// For Logged in users
import UserAnimals from "./pages/Animal";
import Home from "./pages/Home";
import AnimalDetail from "./pages/Animal/AnimalDetail";

const App = () => {
  const auth = useSelector((state) => state.auth);
  const ui = useSelector((state) => state.ui);
  const { status, message } = ui;
  const dispatch = useDispatch();

  useEffect(() => {
    if (ui.status !== "idle") {
      setTimeout(() => {
        dispatch(hideUi());
      }, 5000);
    }
  }, [ui.status]);

  return (
    <>
      {status !== "idle" && <Alert status={status} message={message} />}
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout auth={auth} />}>
          {/* Admin */}
          <Route path="admin" element={<Admin auth={auth} />}>
            {/* Stages */}
            <Route path="stage" element={<Stage />} />
            <Route path="stage/create" element={<CreateStage />} />
            <Route path="stage/:id/edit" element={<EditStage />} />
            {/* Animals */}
            <Route path="animal" element={<Animal />} />
            <Route path="animal/create" element={<CreateAnimal />} />
            <Route path="animal/:id/edit" element={<EditAnimal />} />
            {/* Rounds */}
            <Route path="round" element={<Round />} />
            <Route path="round/create" element={<CreateRound />} />
            <Route path="round/:id/edit" element={<EditRound />} />
          </Route>
          {/* For Logged In User */}
          <Route path="home" element={<Home />}>
            <Route path="animal" element={<UserAnimals />} />
            <Route path="animal/:id" element={<AnimalDetail />} />
          </Route>
          {/* Not Found */}
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
        {/* <Route path="*" element={<div>Not Found</div>} /> */}
      </Routes>
    </>
  );
};

export default App;
