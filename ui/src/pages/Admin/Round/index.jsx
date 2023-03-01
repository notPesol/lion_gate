import { Button, Popconfirm, Space, Table, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnect } from "../../../functions/fetch";
import MainHead from "../../../components/MainHead";
import Loading from "../../../components/Loading";

const initialState = { loading: false, data: [] };

const mapData = (data) => {
  if (!data) {
    return [];
  }

  return data.map((round) => {
    return {
      _id: round?._id,
      no: round?.no,
      time: round?.time,
      animalName: round?.animal?.name,
      showDuration: round?.animal?.showDuration,
      stageNo: round?.stage?.no,
      seatAmount: round?.stage?.seatAmount,
      price: round?.stage?.price,
    };
  });
};

const Round = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [animalsReq, setRoundsReq] = useState(initialState);

  const deleteHandler = async () => {
    setLoading(true);
    const path = "/round_to_shows/";
    try {
      const response = await apiConnect(path + selectedId, null, "DELETE");
      if (!response.ok) {
        throw response?.message;
      }
      message.success("Delete Round Data Success");
      const animals = animalsReq.data.filter(
        (item) => item?._id !== selectedId
      );
      setRoundsReq((prevState) => ({ ...prevState, data: animals }));
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

  const getRounds = async () => {
    setRoundsReq(initialState);
    const path = "/round_to_shows";
    try {
      const response = await apiConnect(path, null, "GET");
      if (!response.ok) {
        throw response?.message;
      }
      const mappedData = mapData(response?.payload);
      message.success("Load Rounds Data Successfully");
      setRoundsReq({ loading: false, data: mappedData });
    } catch (error) {
      message.error(error);
      setRoundsReq(initialState);
    }
  };

  useEffect(() => {
    getRounds();
  }, []);

  const columns = [
    {
      title: "Round",
      dataIndex: "no",
      key: "no",
    },

    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Animal",
      children: [
        {
          title: "Name",
          dataIndex: "animalName",
          key: "animalName",
        },
        {
          title: "Show Duration",
          dataIndex: "showDuration",
          key: "showDuration",
        },
      ],
    },
    {
      title: "Stage",
      children: [
        {
          title: "No.",
          dataIndex: "stageNo",
          key: "stageNo",
        },
        {
          title: "Seat Amount",
          dataIndex: "seatAmount",
          key: "seatAmount",
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
        },
      ],
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, row) => {
        return (
          <Space>
            <Button
              disabled={loading}
              onClick={() => navigate(`/admin/round/${row._id}/edit`)}
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

  const renderRoundsTable = () => {
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
        headText="Round Management"
        buttonText="New Round"
        onClick={() => navigate("/admin/round/create")}
      />
      {renderRoundsTable()}
    </div>
  );
};

export default Round;
