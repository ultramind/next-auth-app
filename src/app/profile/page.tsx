"use client";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePaage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
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

        <button onClick={logout} className="px-8 py-2 bg-blue-800 rounded-lg">
          Logout
        </button>
      </div>
    </div>
  );
}
