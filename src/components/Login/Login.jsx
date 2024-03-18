import { Button, Card, TextInput } from "@tremor/react";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setAuthenticated }) => {
  const apiKey = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    await axios
      .post(`${apiKey}/auth/signin`, data)
      .then((res) => {
        if (res.status === 201) {
          console.log("User login successful..!");
          const jwtToken = res.data.jwt;
          localStorage.setItem("jwtToken", jwtToken);
          setAuthenticated(true);
          reset();
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log("User login failed..!");
      });
  };

  return (
    <div className="px-14 bg-slate-200 h-screen flex items-center justify-center">
      <Card className="w-1/4">
        <form
          className="w-full flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="uppercase text-center font-bold text-3xl">
            Login User
          </h1>
          <span>
            <TextInput
              type="email"
              {...register("email", { required: true })}
              errorMessage={errors.email ? "Invalid email" : ""}
              error={!!errors.email}
              placeholder="Email"
            />
          </span>
          <span>
            <TextInput
              type="password"
              {...register("password", {
                required: true,
                minLength: 8,
                maxLength: 16,
              })}
              errorMessage={
                errors.password
                  ? "Password must be between 8 and 16 characters"
                  : ""
              }
              error={!!errors.password}
              placeholder="Password"
            />
          </span>
          <Button type="submit" className="w-fit self-center" size="sm">
            Login
          </Button>
          <p className="self-center text-sm">
            Don't have any account?{" "}
            <Link className="text-blue-500" to="/register">
              Sign up
            </Link>
            .
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Login;
