"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Loading from "../../helpers/loadingpage/loading";

const VerifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">
        {!verified && <Loading key="2" text="Verifying..." />}
      </h1>

      {verified && (
        <div className="flex flex-col items-center justify-center gap-9">
          <h2 className="text-2xl">Email Verified Successfully</h2>
          <Link href="/login">
            <button
              type="submit"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-rose-700 hover:bg-rose-500 focus:ring-4 focus:ring-white dark:focus:ring-white"
            >
              Login
            </button>
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
