"use client";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePaage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState(null);

  // get user info
  const getUserDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/users/me");
      setUser(response.data.user._id);
      console.log(response);
    } catch (error: any) {
      console.log("Logout failed", error.message);
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/users/logout");
      toast.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      console.log("Logout failed", error.message);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col min-w-full min-h-screen justify-center items-center">
      <div className="w-[450px] h-[450px] flex flex-col gap-4 justify-center items-center">
        <h2 className="text-2xl">Profile Page</h2>
        {isLoading && <span className="text-green-600">Fetching...</span>}

        {user && <Link href={`/profile/${user}`}>{user}</Link>}

        <button onClick={logout} className="px-8 py-2 bg-blue-800 rounded-lg">
          Logout
        </button>
        <button
          onClick={getUserDetails}
          className="px-8 py-2 text-gray-900 bg-yellow-300 rounded-lg"
        >
          Get User details
        </button>
      </div>
    </div>
  );
}
