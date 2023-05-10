import React, { useState } from "react";
import { loginDetails, useUserContext } from "../context/userAuth";

const LoginForm = () => {
  const { loginUser, isLoggingIn } = useUserContext();
  // const loginUser = userContext?.loginUser;
  const [data, setData] = useState<loginDetails>({
    username: "",
    password: "",
  });
  return (
    <form className="px-4 md:px-12 py-8 md:py-16 bg-white rounded-lg flex flex-col">
      <div className="text-2xl font-bold text-center">Login</div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="font-semibold text-sm" htmlFor="">
          Username
        </label>
        <input
          className="bg-gray-100 py-2 px-4 outline-slate-500 text-slate-700 text-sm"
          type="text"
          placeholder="Enter Username..."
          value={data.username}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              username: e.target.value,
            }))
          }
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="font-semibold text-sm" htmlFor="">
          Password
        </label>
        <input
          className="bg-gray-100 py-2 px-4 outline-slate-500 text-slate-700 text-sm"
          type="password"
          placeholder="Enter Password..."
          value={data.password}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />
      </div>

      <div className="mt-5 ">
        <button
          className="bg-slate-700 text-gray-100 hover:bg-slate-900 hover:text-gray-50 duration-300 py-2 px-5 rounded font-semibold "
          type="button"
          onClick={async (e) => {
            e.preventDefault();
            loginUser(data);
          }}
        >
          {isLoggingIn ? "Logging In..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
