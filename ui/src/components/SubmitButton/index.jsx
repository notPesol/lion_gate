import React from "react";
import { Button } from "antd";

const SubmitButton = ({ children }) => {
  return (
    <Button htmlType="submit" type="primary">
      {children}
    </Button>
  );
};

export default SubmitButton;
