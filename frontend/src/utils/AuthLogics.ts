import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";

import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

import { Token } from "../Redux/Slice";

export const AuthLogics = () => {
  const [token, setToken] = useState<any>(null);
  const [ChangePassValues, setChangePassValues] = useState({
    old_password: "",
    new_password1: "",
    new_password2: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    Mobile_No: "",
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
 
      navigate("/");
    } catch (err: any) {
      window.alert(err.response.data.detail);
      console.log(err);
    }
    console.log(token);
  };

  return {
    handleSubmit,
    handleChange,
    values,

    ChangePassValues,
  };
};
