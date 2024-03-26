"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/helpers/loadingpage/loading";

export default function ForgotPassword({ params }: any) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = async (e: any) => {
    e.preventDefault();
    setStatus(false);
    if (password !== confirmPassword) {
      alert("Password does not match, Try again");
      throw new Error("Password does not match");
    }

    try {
      const response = await axios.post("/api/users/createpassword", {
        password,
        userId: params.id,
      });
      setStatus(true);
      alert("Password has been successfully changed");
      router.push("/login");
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  return (
    <div className="max-w-sm  mx-auto h-1/2 pb-20 pt-20 content-center justify-center items-center">
      <div className="py-8">
        <span className="text-5xl text-white text-nowrap ">
          Change Password
        </span>
      </div>
      <div className="py-8">
        <span className="text-5xl text-white text-nowrap ">
          {status === false ? (
            <Loading text="Changing your password ...." />
          ) : (
            ""
          )}
        </span>
      </div>
      <div className=" w-full mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <div className="flex flex-row gap-3">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className=" w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your password"
            required
            onChange={(e) => setPassword(() => e.target.value)}
          />
          <Image
            width={40}
            height={40}
            className="cursor-pointer"
            src={showPassword ? "/so.svg" : "/no.svg"}
            alt=""
            style={{ height: "40px", width: "40px" }}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="confirm-password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Confirm your password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-rose-700 hover:bg-rose-500 focus:ring-4 focus:ring-white dark:focus:ring-white"
        onClick={(e) => handlePasswordChange(e)}
      >
        Submit
      </button>
    </div>
  );
}
