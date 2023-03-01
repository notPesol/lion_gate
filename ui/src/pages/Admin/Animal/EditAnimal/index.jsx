import { Form, InputNumber, message, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../components/Loading";
import MainHead from "../../../../components/MainHead";
import SubmitButton from "../../../../components/SubmitButton";
import { apiConnect } from "../../../../functions/fetch";

const EditAnimal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (formState) => {
    setLoading(true);
    try {
      const response = await apiConnect("/animals/" + id, formState, "PUT");
      console.log(response);
      if (!response.ok) {
        throw response?.message;
      }
      const payload = response?.payload;
      message.success("Update Animal Success");
      navigate("/admin/animal");
      setLoading(false);
    } catch (error) {
      message.error(error);
      setLoading(false);
    }
  };

  const [form] = Form.useForm();

  const getAnimal = async () => {
    try {
      const response = await apiConnect("/animals/" + id, null, "GET");
      console.log(response);
      if (!response.ok) {
        throw response?.message;
      }
      const payload = response?.payload;
      form.setFieldsValue({
        name: payload?.name,
        species: payload?.species,
        type: payload?.type,
        showDuration: payload?.showDuration,
      });
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    getAnimal();
  }, [id]);

  return (
    <div className="main-wrapper">
      {loading && <Loading />}

      {!loading && (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <MainHead headText="Edit Animal" />
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
            <SubmitButton>Update</SubmitButton>
          </div>
        </Form>
      )}
    </div>
  );
};

export default EditAnimal;
