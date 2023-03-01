import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import styles from "./style.module.css";

const adminMenus = [
  { key: "stage", label: "Stage Management" },
  { key: "round", label: "Round Management" },
  { key: "animal", label: "Animal Management" },
];

const getItem = (key, label, icon = null, type = null, children = null) => {
  return {
    key,
    icon,
    label,
    children,
    type,
  };
};

const createMenus = () => {
  return adminMenus.map((menu) => getItem(menu.key, menu.label));
};

const Admin = ({ auth }) => {
  const menuItems = createMenus();

  const navigate = useNavigate();

  const { pathname } = useLocation();
  const path = pathname.replace("/admin/", "");

  const [mode, setMode] = useState(
    window.innerWidth <= 900 ? "horizontal" : "vertical"
  );

  useEffect(() => {
    const windowResizeListener = () => {
      if (window.innerWidth <= 900) {
        setMode("horizontal");
      }
      if (window.innerWidth > 900) {
        setMode("vertical");
      }
    };
    window.addEventListener("resize", windowResizeListener);

    if (!auth?.isAdmin) {
      navigate("/");
    }

    return () => window.removeEventListener("resize", windowResizeListener);
  }, []);

  const onMenuClick = (info) => {
    navigate(`/admin/${info?.key}`);
  };

  return (
    <div className={`content-wrapper ${mode === "vertical" ? "flex" : ""}`}>
      <Menu
        style={{ width: 200 }}
        onClick={onMenuClick}
        items={menuItems}
        defaultSelectedKeys={[path]}
        mode={mode}
      />
      <Outlet />
    </div>
  );
};

export default Admin;
