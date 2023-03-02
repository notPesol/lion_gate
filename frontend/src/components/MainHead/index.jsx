import { Button } from "antd";
import React from "react";
import styles from "./style.module.css";

const MainHead = ({ headText, buttonText, onClick }) => {
  return (
    <div className={styles.mainHead}>
      <div className={styles.headText}>{headText}</div>
      {buttonText && (
        <Button onClick={onClick} type="primary">
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default MainHead;
