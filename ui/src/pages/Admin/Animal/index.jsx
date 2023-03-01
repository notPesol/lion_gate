import { Button, Popconfirm, Space, Table, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnect } from "../../../functions/fetch";
import MainHead from "../../../components/MainHead";
import Loading from "../../../components/Loading";

const initialState = { loading: false, data: [] };

const Animal = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [animalsReq, setAnimalsReq] = useState(initialState);

  const deleteHandler = async () => {
    setLoading(true);
    const path = "/animals/";
    try {
      const response = await apiConnect(path + selectedId, null, "DELETE");
      if (!response.ok) {
        throw response?.message;
      }
      message.success("Delete Animal Data Success");
      const animals = animalsReq.data.filter(
        (item) => item?._id !== selectedId
      );
      setAnimalsReq((prevState) => ({ ...prevState, data: animals }));
      setLoading(false);
    } catch (error) {
      message.error(error);
      setLoading(false);
    } finally {
      setSelectedId(null);
      setLoading(false);
    }
  };

  const cancelHandler = () => {
    setSelectedId(null);
  };

  const getAnimals = async () => {
    setAnimalsReq(initialState);
    const path = "/animals";
    try {
      const response = await apiConnect(path, null, "GET");
      if (!response.ok) {
        throw response?.message;
      }
      const payload = response.payload;
      message.success("Load Animals Data Successfully");
      setAnimalsReq({ loading: false, data: payload || [] });
    } catch (error) {
      message.error(error);
      setAnimalsReq(initialState);
    }
  };

  useEffect(() => {
    getAnimals();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Species",
      dataIndex: "species",
      key: "species",
    },
    {
      title: "Show Duration",
      dataIndex: "showDuration",
      key: "showDuration",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, row) => {
        // console.log(row);

        return (
          <Space>
            <Button
              disabled={loading}
              onClick={() => navigate(`/admin/animal/${row._id}/edit`)}
            >
              Edit
            </Button>
            <Popconfirm
              open={selectedId === row._id}
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => deleteHandler()}
              onCancel={() => cancelHandler()}
              okButtonProps={{
                loading: loading,
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button
                danger
                disabled={loading}
                onClick={() => setSelectedId(row._id)}
              >
                Delete
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const renderAnimalsTable = () => {
    const { loading, data } = animalsReq;
    if (loading) {
      return <Loading size="large" />;
    }

    const dataSource = data.map((stage) => ({ ...stage, key: stage?._id }));
    return <Table dataSource={dataSource} columns={columns} />;
  };

  return (
    <div className="main-wrapper">
      <MainHead
        headText="Animal Management"
        buttonText="New Animal"
        onClick={() => navigate("/admin/animal/create")}
      />
      {renderAnimalsTable()}
    </div>
  );
};

export default Animal;
