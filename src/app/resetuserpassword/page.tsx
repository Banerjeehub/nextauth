"use client";
import { useState } from "react";
import axios from "axios";
import Loading from "../../helpers/loadingpage/loading";

export default function ResetUserPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(true);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setStatus(false);
      await axios.post("/api/users/sentresetpasswordemail", { email });
      alert("A reset password email has been sent");
      setStatus(true);
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  return (
    <div>
      {status === false ? (
        <Loading key="4" text="Processing..." />
      ) : (
        <form className="max-w-sm mx-auto h-1/2 pb-20 pt-20 content-center justify-center items-center">
          <div className="py-8">
            <span className="text-5xl text-white text-nowrap">
              Reset Password
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="name@email.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-rose-700 hover:bg-rose-500 focus:ring-4 focus:ring-white dark:focus:ring-white"
            onClick={(e) => handleSubmit(e)}
          >
            Reset
          </button>
        </form>
      )}
    </div>
  );
}
