"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "../../helpers/loadingpage/loading";
export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", details);
      console.log("Login successful", response);
      router.push("/profile");
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
            {loading ? <Loading key="1" text="Logging in ..." /> : "Login"}
          </span>
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
            value={details.email}
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
              value={details.password}
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
          <div className="flex items-start mb-5 mt-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                checked={details.rememberMe}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                onChange={(e) =>
                  setDetails({ ...details, rememberMe: e.target.checked })
                }
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-rose-700 hover:bg-rose-500 focus:ring-4 focus:ring-white dark:focus:ring-white"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </button>
        <div className="flex flex-row pt-5 gap-5">
          <span>Dont have an acoount?</span>
          <Link href="/signup" className="underline">
            Sign Up
          </Link>
        </div>
        <div className="flex flex-row pt-5 gap-5">
          <span>Forgot Password?</span>
          <Link href="/resetuserpassword" className="underline">
            Reset
          </Link>
        </div>
      </form>
    </div>
  );
}
