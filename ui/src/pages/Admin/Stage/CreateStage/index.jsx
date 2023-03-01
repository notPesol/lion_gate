import { Form, InputNumber, message, Spin, Button } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../components/Loading";
import MainHead from "../../../../components/MainHead";
import SubmitButton from "../../../../components/SubmitButton";
import { apiConnect } from "../../../../functions/fetch";

const CreateStage = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (formState) => {
    console.log("Clicked");
    setLoading(true);
    const path = "/stages";
    try {
      const response = await apiConnect(path, formState, "POST");
      if (!response.ok) {
        throw response?.message;
      }
      message.success("Create Stages Data Success");
      setLoading(false);
      navigate("/admin/stage");
    } catch (error) {
      message.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="main-wrapper">
      {loading && <Loading />}
      {!loading && (
        <Form layout="vertical" onFinish={onFinish}>
          <MainHead headText="Create New Stage" />
          <div className="form-item-wrapper">
            <Form.Item name="no" label="Stage No." rules={[{ required: true }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item
              name="seatAmount"
              label="Seat Amount"
              rules={[{ required: true }]}
            >
              <InputNumber min={20} />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price (Baht)"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <SubmitButton htmlType="submit">Save</SubmitButton>
          </div>
        </Form>
      )}
    </div>
  );
};

export default CreateStage;
