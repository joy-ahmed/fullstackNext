"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [disabledButton, setDisabledButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success("Sign up successfull ✅");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center min-h-screen py-2 justify-center">
      <h1 className="text-4xl mb-10 font-extrabold text-slate-700">Sign up</h1>
      <hr />
      <form onSubmit={onSignup} className="max-w-[400px]">
        <label className="text-sm" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
          className="border border-gray-300 p-3 mb-4 mt-2 rounded focus:outline-none w-full"
        />
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
          disabled={disabledButton}
          type="submit"
          className={` ${
            disabledButton
              ? "bg-slate-500 text-slate-300"
              : "bg-violet-600 text-white"
          } p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 w-full`}
        >
          {disabledButton
            ? "Provide credentials to sign up"
            : loading
            ? "processing..."
            : "Sign up"}
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <span className="text-slate-500 underline">
          {" "}
          <Link href="/login">Log in here</Link>
        </span>
      </p>
    </div>
  );
};

export default SignupPage;
