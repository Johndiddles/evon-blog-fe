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
  checkUserStatus: apiCallStatus;
  loginUser: (data: loginDetails) => Promise<void>;
  signUpUser: (data: signUpDetails) => Promise<void>;
  isAuth: boolean;
}
const UserContext = createContext<UserContextType>({
  userDetails: {
    username: "",
    user_id: null,
  },
  checkUserStatus: "idle",
  async loginUser(data) {},
  async signUpUser(data) {},
  isAuth: false,
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<userDetails>({
    user_id: null,
    username: "",
  });
  const [checkUserStatus, setCheckUserStatus] = useState<apiCallStatus>("idle");
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const loginUser = async (data: loginDetails) => {
    try {
      const response = await axiosInstance.post(`/login`, data);
      console.log({ response });

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
    } catch (error) {
      console.log({ error });
    }
  };

  const signUpUser = async (data: signUpDetails) => {
    try {
      const response = await axiosInstance.post("/create-user", data);
      console.log({ response });
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
    } catch (error) {
      console.log({ error });
    }
  };

  const resetUser = () => {
    setUserDetails({
      user_id: null,
      username: "",
    });
    setCheckUserStatus("idle");
    localStorage.removeItem("ev_au_token");
    setIsAuth(false);
  };

  const logoutUser = async () => {
    resetUser();
    router.push("/");
  };

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.ev_au_token;
      if (token) {
        setCheckUserStatus("pending");
        try {
          console.log({ token });
          setCheckUserStatus("success");
        } catch (error) {
          resetUser();
          setCheckUserStatus("failed");
        }
      } else setCheckUserStatus("failed");
    };

    verifyUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        checkUserStatus,
        loginUser,
        isAuth,
        signUpUser,
      }}
    >
      {children}
      <ToastContainer />
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext) as UserContextType;

export default UserContextProvider;
