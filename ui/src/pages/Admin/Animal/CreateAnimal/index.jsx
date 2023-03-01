import { Form, message, Input, InputNumber } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../components/Loading";
import MainHead from "../../../../components/MainHead";
import SubmitButton from "../../../../components/SubmitButton";
import { apiConnect } from "../../../../functions/fetch";

const CreateAnimal = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (formState) => {
    setLoading(true);
    const path = "/animals";
    try {
      const response = await apiConnect(path, formState, "POST");
      if (!response.ok) {
        throw response?.message;
      }
      message.success("Create Animal Data Success");
      setLoading(false);
      navigate("/admin/animal");
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
          <MainHead headText="Create New Animal" />
          <div className="form-item-wrapper">
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="species" label="Species">
              <Input />
            </Form.Item>
            <Form.Item name="type" label="Type">
              <Input />
            </Form.Item>
            <Form.Item
              name="showDuration"
              label="Show Duration (Minutes)"
              rules={[{ required: true }]}
            >
              <InputNumber min={10} />
            </Form.Item>
            <SubmitButton>Save</SubmitButton>
          </div>
        </Form>
      )}
    </div>
  );
};

export default CreateAnimal;
