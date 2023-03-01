import { Form, InputNumber, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../components/Loading";
import MainHead from "../../../../components/MainHead";
import SubmitButton from "../../../../components/SubmitButton";
import { apiConnect } from "../../../../functions/fetch";

const EditStage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onFinish = async (formState) => {
    setLoading(true);
    try {
      const response = await apiConnect("/stages/" + id, formState, "PUT");
      console.log(response);
      if (!response.ok) {
        throw response?.message;
      }
      setLoading(false);
      message.success("Update Stage Success");
      navigate("/admin/stage");
    } catch (error) {
      message.error(error);
      setLoading(false);
    }
  };

  const [form] = Form.useForm();

  const getStage = async () => {
    try {
      const response = await apiConnect("/stages/" + id, null, "GET");
      console.log(response);
      if (!response.ok) {
        throw response?.message;
      }
      const payload = response?.payload;
      form.setFieldsValue({
        no: payload?.no,
        seatAmount: payload?.seatAmount,
        price: payload?.price,
      });
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    getStage();
  }, [id]);

  return (
    <div className="main-wrapper">
      {loading && <Loading />}
      {!loading && (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <MainHead headText="Edit Stage" />
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
            <SubmitButton>Update</SubmitButton>
          </div>
        </Form>
      )}
    </div>
  );
};

export default EditStage;
