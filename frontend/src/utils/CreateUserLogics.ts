import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const CreateUserLogics = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    f_name: "",
    l_name: "",
    email_id: "",
    phone_number: 0,
    address: "",
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
  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const handleSubmit = async () => {
    try {
      let res = await axiosInstance.post(
        `http://127.0.0.1:8000/create_user/`,
        values
      );
      console.log(res);
      navigate("/home");
    } catch (err: any) {
      window.alert(err.response.data.error);
      console.log(err);
    }
  };

  return {
    handleSubmit,
    handleChange,
    values,
  };
};
