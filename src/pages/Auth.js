import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = (props) => {
  const currentUser = localStorage.getItem("currentUser");

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser, navigate]);
  return <div>{props.children}</div>;
};

export default Auth;