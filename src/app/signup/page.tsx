"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success!", response.data);
      toast.success("Signup successful...");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup Failled", error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col min-w-full min-h-screen justify-center items-center">
      <div className="w-[400px] p-8 border border-white-500 rounded-lg">
        {isLoading && <h4>Processing...</h4>}
        <h2 className="text-3xl my-4 font-semibold">SignUp</h2>
        <hr />
        <div className="mt-4">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              Username
            </span>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 text-slate-800
            "
            />
          </label>
        </div>
        <div className="mt-4">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              Email
            </span>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 text-slate-800
            "
            />
          </label>
        </div>
        <div className="mt-4">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              Password
            </span>
            <input
              type="password"
              name="password"
              placeholder="Your Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 text-slate-800
            "
            />
          </label>
        </div>
        <button
          onClick={onSignup}
          className="py-2 w-full px-10 mt-4 bg-slate-600 rounded"
        >
          {buttonDisabled ? "No Sign up " : "Sign Up..."}
        </button>
        <Link className="mt-4 block" href="/login">
          Already a member Login
        </Link>
      </div>
    </div>
  );
}
