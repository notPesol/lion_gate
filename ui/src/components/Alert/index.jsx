import React from "react";
import { useDispatch } from "react-redux";
import { hideUi } from "../../redux/slices/uiSlice";
import styles from "./style.module.css";

const genBgColor = (status) => {
  if (status === "loading") {
    return styles.blue;
  }
  if (status === "success") {
    return styles.green;
  }
  if (status === "error") {
    return styles.red;
  }
  return "";
};

const Alert = ({ message, status }) => {
  const dispatch = useDispatch();

  const hideUiHandler = () => {
    dispatch(hideUi());
  };

  const className = `${styles.alert} ${genBgColor(status)}`;

  return (
    <div
      onClick={hideUiHandler}
      style={{ backgroundColor: genBgColor(status) }}
      className={className}
    >
      {message}
    </div>
  );
};

export default Alert;
