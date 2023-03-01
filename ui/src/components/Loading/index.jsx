import React from "react";
import { Spin } from "antd";

import styles from "./style.module.css";

const Loading = ({ size = "medium" }) => {
  return (
    <div className={styles.loadingWrapper}>
      <Spin size={size} />
    </div>
  );
};

export default Loading;
