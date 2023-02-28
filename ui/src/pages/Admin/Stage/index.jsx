import { Button, Popconfirm, Space, Table, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainHead from "../../../components/MainHead";

const Stage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const deleteHandler = async () => {
    setLoading(true);
    console.log("Delete: ", selectedId);
    message.success(`Deleted`);
    setSelectedId(null);
    setLoading(false);
  };

  const cancelHandler = () => {
    setSelectedId(null);
  };

  const dataSource = [
    {
      key: "1",
      id: "1",
      no: 1,
      seatAmount: 20,
      price: 40,
    },
    {
      key: "2",
      id: "2",
      no: 2,
      seatAmount: 30,
      price: 50,
    },
    {
      key: "3",
      id: "3",
      no: 3,
      seatAmount: 40,
      price: 80,
    },
  ];

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
            <Button onClick={() => navigate(`/admin/stage/${row.key}`)}>
              Edit
            </Button>
            <Popconfirm
              open={selectedId === row.id}
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
                type="primary"
                danger
                onClick={() => setSelectedId(row.id)}
              >
                Delete
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <div className="main-wrapper">
      <MainHead
        headText="Stage Management"
        buttonText="New Stage"
        onClick={() => navigate("/admin/stage/new")}
      />
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Stage;
