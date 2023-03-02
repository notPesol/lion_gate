import { Button, Popconfirm, Space, Table, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnect } from "../../../functions/fetch";
import MainHead from "../../../components/MainHead";

const initialState = { loading: false, data: [] };

const Stage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [stagesReq, setStagesReq] = useState(initialState);

  const deleteHandler = async () => {
    setLoading(true);
    const path = "/stages/";
    try {
      const response = await apiConnect(path + selectedId, null, "DELETE");
      if (!response.ok) {
        throw response?.message;
      }
      message.success("Delete Stages Data Success");
      const stages = stagesReq.data.filter(
        (stage) => stage?._id !== selectedId
      );
      setStagesReq((prevState) => ({ ...prevState, data: stages }));
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

  const getStages = async () => {
    setStagesReq(initialState);
    const path = "/stages";
    try {
      const response = await apiConnect(path, null, "GET");
      if (!response.ok) {
        throw response?.message;
      }
      const payload = response.payload;
      message.success("Load Stages Data Success");
      setStagesReq({ loading: false, data: payload || [] });
    } catch (error) {
      message.error(error);
      setStagesReq(initialState);
    }
  };

  useEffect(() => {
    getStages();
  }, []);

  const columns = [
    {
      title: "Room No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Seat Amount",
      dataIndex: "seatAmount",
      key: "seatAmount",
    },
    {
      title: "Price (Baht)",
      dataIndex: "price",
      key: "price",
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
              onClick={() => navigate(`/admin/stage/${row._id}/edit`)}
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
              <Button danger disabled={loading} onClick={() => setSelectedId(row._id)}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const renderStagesTable = () => {
    const { loading, data } = stagesReq;
    if (loading) {
      return <Spin />;
    }

    const dataSource = data.map((stage) => ({ ...stage, key: stage?._id }));
    return <Table dataSource={dataSource} columns={columns} />;
  };

  return (
    <div className="main-wrapper">
      <MainHead
        headText="Stage Management"
        buttonText="New Stage"
        onClick={() => navigate("/admin/stage/create")}
      />
      {renderStagesTable()}
    </div>
  );
};

export default Stage;
