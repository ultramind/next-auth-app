"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { url } from "inspector";
import Link from "next/link";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      console.log(token);
      const res = await axios.post("/api/users/verifyemail", { token });
      toast.success(res.data.message);
      setVerified(true);
    } catch (error: any) {
      setError(true);
      // toast.error(error.response.data.error);
      console.log(error);
    }
  };

  //   get toke from url
  useEffect(() => {
    const url = window.location.search.split("=")[1];
    setToken(url || "");
  }, []);

  //   get token and run the verifyEMail
  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col justify-center items-center gap-2 min-h-screen p-4">
      <h1 className="text-4xl">Verify Email</h1>
      <h2>{token ? token : "No Token"}</h2>

      {verified && (
        <div className="center">
          <h2 className="text-2xl bg-green-500 p-2">Email verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 p-2">Email verification error</h2>
          {/* <Link href="/logn">Login</Link> */}
        </div>
      )}
    </div>
  );
}
