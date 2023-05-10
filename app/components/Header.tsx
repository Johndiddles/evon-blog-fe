"use client";

import Link from "next/link";
import React from "react";
import { useUserContext } from "../context/userAuth";

const Header = () => {
  const { isAuth, logoutUser } = useUserContext();
  return (
    <div className="bg-white flex justify-center px-4 md:px-8 ">
      <div className="container flex justify-between items-center py-5">
        <div className="font-bold text-lg md:text-2xl text-slate-800">
          <Link href="/">Evon Medics Blog</Link>
        </div>
        <nav className="text-sm md:text-base">
          <ul className="flex gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            {isAuth ? (
              <li>
                <button onClick={logoutUser}>Logout</button>
              </li>
            ) : (
              <li>
                <Link href="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
