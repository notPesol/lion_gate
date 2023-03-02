import React, { useEffect, useState } from "react";
import { Form, InputNumber, message, TimePicker, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import Loading from "../../../../components/Loading";
import MainHead from "../../../../components/MainHead";
import SubmitButton from "../../../../components/SubmitButton";
import { apiConnect } from "../../../../functions/fetch";

const timeFormat = "HH:mm";

const initialState = { loading: false, data: [] };
const EditRound = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [animalsReq, setAnimalsReq] = useState(initialState);
  const [stagesReq, setStagesReq] = useState(initialState);

  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = async (formState) => {
    setLoading(true);
    const { time } = formState;
    const params = { ...formState, time: time?.format("HH:mm") };
    const path = "/round_to_shows/" + id;
    try {
      const response = await apiConnect(path, params, "PUT");
      if (!response.ok) {
        throw response?.message;
      }
      message.success("Update Round Data Success");
      setLoading(false);
      navigate("/admin/round");
    } catch (error) {
      message.error(error);
      setLoading(false);
    }
  };

  const getRound = async () => {
    try {
      const response = await apiConnect("/round_to_shows/" + id, null, "GET");
      if (!response.ok) {
        throw response?.message;
      }
      const payload = response?.payload;
      const [hour, min] = payload?.time?.split(":");
      const time = dayjs()
        .set("hour", hour || 0)
        .set("minute", min || 0);
      form.setFieldsValue({
        no: payload?.no,
        time: time,
        animal: payload?.animal?._id,
        stage: payload?.stage?._id,
      });
    } catch (error) {
      message.error(error);
      navigate("/admin/round");
    }
  };

  const getAnimals = async () => {
    setAnimalsReq({ loading: true, data: [] });
    const path = "/animals";
    try {
      const response = await apiConnect(path);
      console.log(response);
      if (!response.ok) {
        throw response?.message;
      }
      setAnimalsReq({ loading: false, data: response?.payload || [] });
    } catch (error) {
      console.log(error);
      setAnimalsReq(initialState);
    }
  };

  const getStages = async () => {
    setStagesReq({ loading: true, data: [] });
    const path = "/stages";
    try {
      const response = await apiConnect(path);
      console.log(response);
      if (!response.ok) {
        throw response?.message;
      }
      setStagesReq({ loading: false, data: response?.payload || [] });
    } catch (error) {
      console.log(error);
      setStagesReq(initialState);
    }
  };

  useEffect(() => {
    getRound();
    getAnimals();
    getStages();
  }, [id]);

  const renderAnimalSelectOptions = () => {
    const { loading, data } = animalsReq;
    if (loading) {
      return;
    }

    return data.map((animal) => (
      <Select.Option key={animal?._id} value={animal?._id}>
        {animal?.name}
      </Select.Option>
    ));
  };

  const renderStageSelectOptions = () => {
    const { loading, data } = stagesReq;
    if (loading) {
      return;
    }

    return data.map((stage) => (
      <Select.Option key={stage?._id} value={stage?._id}>
        {stage?.no}
      </Select.Option>
    ));
  };

  return (
    <div className="main-wrapper">
      {loading && <Loading />}
      {!loading && (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <MainHead headText="Create New Round" />
          <div className="form-item-wrapper">
            <Form.Item name="no" label="Round" rules={[{ required: true }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item name="time" label="Time" rules={[{ required: true }]}>
              <TimePicker use12Hours format={timeFormat} />
            </Form.Item>
            <Form.Item
              name="animal"
              label="Animal"
              rules={[{ required: true }]}
            >
              <Select>{renderAnimalSelectOptions()}</Select>
            </Form.Item>
            <Form.Item name="stage" label="Stage" rules={[{ required: true }]}>
              <Select>{renderStageSelectOptions()}</Select>
            </Form.Item>
            <SubmitButton htmlType="submit">Save</SubmitButton>
          </div>
        </Form>
      )}
    </div>
  );
};

export default EditRound;
