import React from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { showUi } from "../../redux/slices/uiSlice";
import styles from "./style.module.css";

const Layout = ({ auth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(showUi({ status: "success", message: "Logged out." }));
    navigate("/login");
  };

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={styles.layoutWrapper}>
      <div className={styles.header}>
        <div className={styles.name}>
          {auth?.isAdmin ? "Zoo Management" : "Lion Gate"}
        </div>
        <div className={styles.userBox}>
          <div className={styles.circle}></div>
          <div onClick={logoutHandler} className={styles.text}>
            {auth?.isAdmin ? "Admin" : auth?.username} Logout
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
