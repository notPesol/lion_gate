import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./style.module.css";

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

const Admin = () => {
  const menuItems = createMenus();

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

    return () => window.removeEventListener("resize", windowResizeListener);
  }, []);

  return (
    <div className={`content-wrapper ${mode === "vertical" ? "flex" : ""}`}>
      <Menu
        style={{ width: 200 }}
        onClick={(info) => console.log(info)}
        items={menuItems}
        mode={mode}
      />
      <Outlet />
    </div>
  );
};

export default Admin;
