import { Button, Card, TextInput } from "@tremor/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Register = () => {
  const apiKey = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    await axios
      .post(`${apiKey}/auth/signup`, data)
      .then((res) => {
        if (res.status === 201) {
          console.log("User Registered Successfully..!");
          reset();
          navigate('/');
        }
      })
      .catch((err) => {
        console.log("User registration failed..!");
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
            Register User
          </h1>
          <span>
            <TextInput
              type="text"
              {...register("name", {
                required: true,
                pattern: { value: /^[a-zA-Z\s]+$/, message: "Invalid name" },
              })}
              errorMessage={errors.name ? "Invalid name" : ""}
              error={!!errors.name}
              placeholder="Name"
            />
          </span>
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
            Register
          </Button>
          <p className="self-center text-sm">
            Already have an account?{" "}
            <Link className="text-blue-500" to="/">
              Sign in
            </Link>
            .
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Register;
