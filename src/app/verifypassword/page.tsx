"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "../../helpers/loadingpage/loading";

const VerifyPasswordPage = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserPassword = async () => {
    try {
      const response: any = await axios.post("/api/users/verifypassword", {
        token,
      });
      setVerified(true);
      const userId = response.data.userId;
      router.push(`/createpassword/${userId}`);
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
      verifyUserPassword();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {!verified && <Loading text="Processing..." />}

      {verified && <Loading text="Redirecting..." />}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyPasswordPage;
