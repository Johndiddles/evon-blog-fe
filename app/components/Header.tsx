"use client";

import Link from "next/link";
import React from "react";
import { useUserContext } from "../context/userAuth";

const Header = () => {
  const { isAuth } = useUserContext();
  return (
    <div className="bg-white flex justify-center ">
      <div className="container flex justify-between items-center py-5">
        <div className="font-bold text-2xl text-slate-800">
          <Link href="/">Evon Medics Blog</Link>
        </div>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            {isAuth ? (
              <li>
                <Link href="/login">Logout</Link>
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
