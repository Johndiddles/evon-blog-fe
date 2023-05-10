"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type userDetails = {
  user_id: number | null;
  username: string;
};
export type loginDetails = {
  username: string;
  password: string;
};

export type signUpDetails = {
  username: string;
  email: string;
  password: string;
};

export type apiCallStatus = "idle" | "pending" | "success" | "failed";

interface UserContextType {
  userDetails: userDetails;
  // checkUserStatus: apiCallStatus;
  loginUser: (data: loginDetails) => Promise<void>;
  logoutUser: () => void;
  signUpUser: (data: signUpDetails) => Promise<void>;
  isAuth: boolean;
  isLoggingIn: boolean;
  isSigningUp: boolean;
}

const UserContextSchema: UserContextType = {
  userDetails: {
    username: "",
    user_id: null,
  },
  // checkUserStatus: "idle",
  async loginUser(data) {},
  async logoutUser() {},
  async signUpUser(data) {},
  isLoggingIn: false,
  isSigningUp: false,
  isAuth: false,
};

const UserContext = createContext<UserContextType>(UserContextSchema);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<userDetails>({
    user_id: null,
    username: "",
  });
  // const [checkUserStatus, setCheckUserStatus] = useState<apiCallStatus>("idle");
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);

  const loginUser = async (data: loginDetails) => {
    setIsLoggingIn(true);
    try {
      const response = await axiosInstance.post(`/login`, data);

      setUserDetails(() => ({
        username: response?.data?.username,
        user_id: response?.data?.id,
      }));
      setIsAuth(true);
      localStorage.setItem("ev_au_token", response?.data?.token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response?.data?.token}`;

      router.push("/");
      setIsLoggingIn(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      setIsLoggingIn(false);
    }
  };

  const signUpUser = async (data: signUpDetails) => {
    setIsSigningUp(true);
    try {
      const response = await axiosInstance.post("/create-user", data);

      setUserDetails(() => ({
        username: response?.data?.username,
        user_id: response?.data?.user_id,
      }));
      setIsAuth(true);
      localStorage.setItem("ev_au_token", response?.data?.token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response?.data?.token}`;
      router.push("/");
      setIsSigningUp(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      setIsSigningUp(false);
    }
  };

  const resetUser = () => {
    setUserDetails({
      user_id: null,
      username: "",
    });
    // setCheckUserStatus("idle");
    localStorage.removeItem("ev_au_token");
    setIsAuth(false);
  };

  const logoutUser = () => {
    resetUser();
    router.push("/login");
    toast.success("Logged out successfully");
  };

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     const token = localStorage.ev_au_token;
  //     if (token) {
  //       setCheckUserStatus("pending");
  //       try {
  //         setCheckUserStatus("success");
  //       } catch (error) {
  //         resetUser();
  //         setCheckUserStatus("failed");
  //       }
  //     } else setCheckUserStatus("failed");
  //   };

  //   verifyUser();
  // }, []);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        // checkUserStatus,
        loginUser,
        isAuth,
        signUpUser,
        logoutUser,
        isLoggingIn,
        isSigningUp,
      }}
    >
      {children}
      <ToastContainer />
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext) as UserContextType;

export default UserContextProvider;
