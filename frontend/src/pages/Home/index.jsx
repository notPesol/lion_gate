import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const menus = [
  { key: "animal", label: "Animals" },
  { key: "round", label: "Rounds" },
  { key: "stage", label: "Stages" },
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
  return menus.map((menu) => getItem(menu.key, menu.label));
};

const Home = ({ auth }) => {
  const menuItems = createMenus();

  const navigate = useNavigate();

  const { pathname } = useLocation();
  const path = pathname.replace("/home/", "");

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

    // if (!auth?.isAdmin) {
    //   navigate("/");
    // }

    return () => window.removeEventListener("resize", windowResizeListener);
  }, []);

  const onMenuClick = (info) => {
    navigate(`/home/${info?.key}`);
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

export default Home;
