import { Button, Input, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnect } from "../../functions/fetch";
import MainHead from "../../components/MainHead";
import Loading from "../../components/Loading";

const initialState = { loading: false, data: [] };

const Animal = () => {
  const navigate = useNavigate();

  const [animalsReq, setAnimalsReq] = useState(initialState);
  const [filterValue, setFilterValue] = useState("");

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
      title: "Type",
      dataIndex: "type",
      key: "type",
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
            <Button onClick={() => navigate(`/home/animal/${row._id}`)}>
              Detail
            </Button>
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

    let dataSource = data.map((animal) => ({ ...animal, key: animal?._id }));

    // If have filterValue
    if (filterValue) {
      dataSource = dataSource.filter((animal) => {
        const value = filterValue.toLowerCase();
        return (
          animal?.name?.toLowerCase()?.startsWith(value) ||
          animal?.type?.toLowerCase()?.startsWith(value)
        );
      });
    }

    return <Table dataSource={dataSource} columns={columns} />;
  };

  return (
    <div className="main-wrapper">
      <MainHead headText="Animals" />
      {/* Filter Input */}
      <div className="input-wrapper">
        <Input
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Search by Name, Type"
        />
      </div>
      {renderAnimalsTable()}
    </div>
  );
};

export default Animal;
