"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "@/helpers/loadingpage/loading";

export default function SignupPage() {
  const Router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (details.password !== confirmPassword) {
      throw new Error("Passwords doesnt match");
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", details);
      // console.log("signup successful", response.data);
      Router.push("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form className="max-w-sm  mx-auto h-1/2 pb-20 pt-20 content-center justify-center items-center">
        <div className="flex text-5xl items-center mb-10">
          <span>
            {loading ? <Loading key="1" text="Signing up ..." /> : "Signup"}
          </span>
        </div>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            placeholder="johndoe"
            required
            onChange={(e) =>
              setDetails({ ...details, username: e.target.value })
            }
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            placeholder="name@email.com"
            required
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
          />
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
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
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
          onClick={(e) => handleSubmit(e)}
        >
          Register
        </button>
        <div className="flex flex-row pt-5 gap-5">
          <span>Already have an account?</span>
          <Link href="/login" className="underline">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}
