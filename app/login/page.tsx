"use client";
import React, { useState } from "react";
import { useUserContext } from "../context/userAuth";
import { axiosInstance } from "../utils/axiosInstance";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUp";

const LoginPage = () => {
  return (
    <main className="flex flex-col justify-center items-center px-4 md:px-8">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-16">
        <LoginForm />
        <SignUpForm />
      </div>
    </main>
  );
};

export default LoginPage;
