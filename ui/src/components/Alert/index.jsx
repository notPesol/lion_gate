import React from "react";
import { useDispatch } from "react-redux";
import { hideUi } from "../../redux/slices/uiSlice";
import styles from "./style.module.css";

const genBgColor = (status) => {
  if (status === "loading") {
    return "#0751ac";
  }
  if (status === "success") {
    return "green";
  }
  if (status === "error") {
    return "red";
  }
  return "";
};

const Alert = ({ message, status }) => {
  const dispatch = useDispatch();

  const hideUiHandler = () => {
    dispatch(hideUi());
  };

  return (
    <div
      onClick={() => dispatch(hideUi())}
      style={{ backgroundColor: genBgColor(status) }}
      className={styles.alert}
    >
      {message}
    </div>
  );
};

export default Alert;
