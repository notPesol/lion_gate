import React, { useEffect, useRef, useState } from "react";
import { message } from "antd";
import { useParams } from "react-router-dom";
import { apiConnect } from "../../../functions/fetch";
import MainHead from "../../../components/MainHead";
import Loading from "../../../components/Loading";
import QRCode from "qrcode";

const initialState = { loading: false, data: null };

const qrOpts = {
  errorCorrectionLevel: "H",
  type: "image/jpeg",
  quality: 0.3,
  margin: 1,
  color: {
    dark: "#010599FF",
    light: "#FFBF60FF",
  },
};

const AnimalDetail = () => {
  const { id } = useParams();

  const [animalsReq, setAnimalsReq] = useState(initialState);
  const imgRef = useRef();

  const getAnimal = async () => {
    setAnimalsReq({ loading: true, data: null });
    const path = "/animals/" + id;
    try {
      const response = await apiConnect(path, null, "GET");
      if (!response.ok) {
        throw response?.message;
      }
      const payload = response.payload;
      message.success("Load Animal Data Successfully");
      setAnimalsReq({ loading: false, data: payload });
    } catch (error) {
      message.error(error);
      setAnimalsReq(initialState);
    }
  };

  const { loading, data } = animalsReq;
  useEffect(() => {
    getAnimal();
  }, [id]);

  useEffect(() => {
    if (data) {
      QRCode.toDataURL(
        `https://www.google.com/search?q=${data?.name}`,
        qrOpts,
        (err, url) => {
          if (err) throw err;
          imgRef.current.src = url;
        }
      );
    }
  }, [data]);

  return (
    <div className="main-wrapper">
      {loading && <Loading />}
      {!loading && (
        <>
          <MainHead headText="Animal" />
          <h1>{data?.name}</h1>
          <p>Species: {data?.species}</p>
          <p>Type: {data?.type}</p>
          <p>Show duration: {data?.showDuration}</p>

          <img width={200} height={200} ref={imgRef} />
        </>
      )}
    </div>
  );
};

export default AnimalDetail;
