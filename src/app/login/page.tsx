"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
// import { axio } from "axios";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onSingup = () => {};

  return (
    <div className="flex flex-col min-w-full min-h-screen justify-center items-center">
      <div className="w-[400px] p-8 border border-white-300 rounded-lg">
        <h2 className="text-3xl my-4 font-semibold">Login</h2>
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
        <button className="py-2 w-full px-10 mt-4 bg-slate-600 rounded">Login Here...</button>
        <Link className="mt-4 block" href='/signup'>Your not a member Sign up</Link>
      </div>
    </div>
  );
}
