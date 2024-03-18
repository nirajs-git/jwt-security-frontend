import { Button } from "@tremor/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ setAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-8 p-14">
      <h1 className="font-bold text-3xl text-center">Welcome to Dashboard</h1>
      <Button onClick={handleLogout} className="w-fit self-center" size="sm">
        Logout
      </Button>
    </div>
  );
};

export default Home;
