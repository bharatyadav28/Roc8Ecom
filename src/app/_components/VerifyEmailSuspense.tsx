"use client";
import React, { useState, Suspense } from "react";
import OtpInput from "react-otp-input";
import { useRouter, useSearchParams } from "next/navigation";

import Card from "~/app/_components/_UI/Card";
import useHttp from "../_hooks/use-http";
import { successToast, errorToast } from "~/helpers/toasts";

const VerifyEmailSuspense: React.FC = () => {
  const [otp, setOtp] = useState("");
  const { dbConnect, isLoading, error, setError } = useHttp();
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  const email = params.get("email");
  let hiddenEmail = "";
  if (email) {
    const splitEmail = email?.split("@");

    const address = splitEmail[0];
    hiddenEmail += address?.slice(0, 3);
    if (address) {
      const remaning = address.length - 3;
      for (let i = 1; i <= remaning; i++) {
        hiddenEmail += "*";
      }
    }
    hiddenEmail += "@" + splitEmail[1];
  }

  const handleChange = (value: string) => {
    if (typeof value === "string") {
      setOtp(value);
    }
  };

  const checkResultType = (obj: unknown): obj is { msg: string } => {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "msg" in obj &&
      typeof obj.msg === "string"
    );
  };

  const handleSuccess = (data: unknown) => {
    if (checkResultType(data)) {
      successToast(data.msg);
      successToast("Please login to continue");
      router.push("/login");
      return;
    }
  };
  const onOtpSubmit = async () => {
    await dbConnect(
      {
        path: "/api/verify-user",
        method: "POST",
        payload: { email, otp },
      },
      handleSuccess,
    );
    setOtp("");
  };

  const otpValid = otp.length === 8;

  if (error) {
    errorToast(error);
    setError("");
  }
  return (
    <div>
      <Card className="otp mx-auto mt-10 flex w-4/12 flex-col items-center">
        <p className="text-2xl font-semibold">Verify your email</p>
        <p className=" mt-3 text-sm font-medium">
          Enter the 8 digit code you have received on <br />
        </p>
        <p className="mb-5 text-sm font-medium">{hiddenEmail}</p>

        <p className=" self-start text-sm font-medium">Code</p>
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={8}
          renderSeparator={<span>&nbsp;</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle="border border-slate-600  "
          // containerStyle="w-full ml-[120px]"
        />
        <button
          onClick={onOtpSubmit}
          disabled={!otpValid || isLoading}
          className="mt-5 w-full cursor-pointer rounded-md border bg-black px-4 py-2 text-white hover:bg-orange-600 disabled:cursor-not-allowed   "
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </Card>
    </div>
  );
};

export default VerifyEmailSuspense;
