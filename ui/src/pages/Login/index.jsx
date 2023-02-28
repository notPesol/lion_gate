import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Input } from "antd";
import { loginUser } from "../../redux/slices/authSlice";
import logo from "../../assets/images/dolphin.jpg";
import styles from "./style.module.css";

const Login = () => {
  const [isSignInMode, setIsSignInMode] = useState(true);

  const dispatch = useDispatch();

  const onFinish = (formState) => {
    if (isSignInMode) {
      dispatch(loginUser(formState));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.login}>
      <div className={styles.logoWrapper}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.formWrapper}>
        <div className={styles.forForm}>
          <h1>{isSignInMode ? "Sign In" : "Sign Up"}</h1>
          <Form
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                {isSignInMode ? "Sign In" : "Sign Up"}
              </Button>
            </Form.Item>
          </Form>

          {isSignInMode && (
            <div className={styles.signWrapper}>
              Don't have an account ?{" "}
              <span
                onClick={() => setIsSignInMode(!isSignInMode)}
                className={styles.sign}
              >
                Sign up
              </span>
            </div>
          )}
          {!isSignInMode && (
            <div className={styles.signWrapper}>
              Have an account ?{" "}
              <span
                onClick={() => setIsSignInMode(!isSignInMode)}
                className={styles.sign}
              >
                Sign In
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
