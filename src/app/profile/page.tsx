/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function profilePage() {
  const router = useRouter();
  const [data, setData] = useState("Nothing");
  const handleClick = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("Logged out");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/users/localData");
      console.log(res);
      const userData = res.data.user;

      setData(userData.email);
    };
    getData();
  }, [data]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <span>Profile page: {data}</span>
      <button
        type="submit"
        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-rose-700 hover:bg-rose-500 focus:ring-4 focus:ring-white dark:focus:ring-white mt-5"
        onClick={handleClick}
      >
        Logout
      </button>
    </div>
  );
}
