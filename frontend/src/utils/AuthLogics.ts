import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

export const AuthLogics = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues((preVal: any) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const handleSubmit = async () => {
    try {
      let res = await axios.post(`http://127.0.0.1:8000/token/`, values);
      console.log(res);
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      navigate("home/");
    } catch (err: any) {
      window.alert(err.response.data.detail);
      console.log(err);
    }
  };
  const RefreshToken = async () => {
    localStorage.removeItem("token");
    const refresh = localStorage.getItem("refresh");
    const response = await axios.post(
      "http://127.0.0.1:8000/refreshtoken",
      refresh
    );
    if (response.status === 200) {
      localStorage.setItem("token", response.data.access);
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      RefreshToken();
    }, 2000);

    return clearInterval(interval);
  }, []);
  return {
    handleSubmit,
    handleChange,
    values,
  };
};
