"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonDdisabled, setButtonDisabled] = React.useState(false);

  const onLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response.data);
      router.push("/profile");
      toast.success(response.data.message);
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [user]);

  return (
    <div className="flex flex-col min-w-full min-h-screen justify-center items-center">
      <div className="w-[400px] p-8 border border-white-300 rounded-lg">
        <h2 className="text-3xl my-4 font-semibold">
          {isLoading ? "Processing..." : "Login"}
        </h2>
        <hr />
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
          onClick={onLogin}
          className="py-2 w-full px-10 mt-4 bg-slate-600 rounded"
        >
          {buttonDdisabled ? "Login Now" : "Login"}
        </button>
        <Link className="mt-4 block" href="/signup">
          Your not a member Sign up
        </Link>
      </div>
    </div>
  );
}
