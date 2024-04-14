"use client";
import { useRouter } from "next/navigation";

import AuthForm from "../../_components/AuthForm";
import useHttp from "../../_hooks/use-http";
import { successToast, errorToast } from "~/helpers/toasts";

const LoginPage = () => {
  const router = useRouter();
  const { dbConnect, isLoading, error, setError } = useHttp();

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
      router.push("/");
    }
  };

  if (error) {
    errorToast(error);
    setError("");
  }

  const handleLogin = async (submittedData: unknown) => {
    await dbConnect(
      { path: "/api/login", method: "POST", payload: submittedData },
      handleSuccess,
    );
  };
  return (
    <div className="mb-10  mt-10 flex h-max w-screen flex-col  items-center justify-center ">
      <AuthForm
        onSubmition={handleLogin}
        typeForm="login"
        loading={isLoading}
      />
    </div>
  );
};

export default LoginPage;
