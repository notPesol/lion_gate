import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Input } from "antd";
import { loginUser } from "../../redux/slices/authSlice";
import logo from "../../assets/images/dolphin.jpg";
import styles from "./style.module.css";
import { apiConnect } from "../../functions/fetch";
import { showUi } from "../../redux/slices/uiSlice";

const Login = () => {
  const auth = useSelector((state) => state.auth);

  const [isSignInMode, setIsSignInMode] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth?.token) {
      if (auth?.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [auth?.token]);

  const registerUser = async ({ username, password }) => {
    dispatch(showUi({ status: "loading", message: "Sign up..." }));
    try {
      const response = await apiConnect(
        "/users/register",
        { username, password },
        "POST"
      );
      if (!response.ok) {
        throw response?.message;
      }
      console.log(response.payload);
      dispatch(
        showUi({
          status: "success",
          message: "Register Successfully, Now you can login.",
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(showUi({ status: "error", message: error }));
    }
  };

  const onFinish = (formState) => {
    if (isSignInMode) {
      dispatch(loginUser(formState));
    } else {
      registerUser(formState);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.logoWrapper}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.formWrapper}>
        <div className={styles.forForm}>
          <h1>{isSignInMode ? "Sign In" : "Sign Up"}</h1>
          <Form layout="vertical" onFinish={onFinish}>
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
              Don't have an account ?
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
