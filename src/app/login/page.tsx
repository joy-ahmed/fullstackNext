"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [disabledButton, setDisabledButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login success🥳");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center min-h-screen py-2 justify-center">
      <h1 className="text-4xl mb-5 font-extrabold text-slate-700">
        Welcome Back <span>👋</span>
      </h1>
      <p className="mb-10 text-sm text-slate-500">
        Enter your credentials to log in your account
      </p>
      <hr />
      <div className="max-w-[400px]">
        <label className="text-sm" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
          className="border border-gray-300 p-3 mb-4 mt-2 rounded focus:outline-none w-full"
        />
        <label className="text-sm" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
          className="border border-gray-300 p-3 mb-4 mt-2 rounded focus:outline-none w-full"
        />
        <button
          onClick={onLogin}
          className=" p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 w-full bg-violet-600 text-white"
        >
          Log in
        </button>
      </div>
      <p>
        {`Don't`} have an account?{" "}
        <span className="text-slate-500 underline">
          {" "}
          <Link href="/signup">Sign up here</Link>
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
