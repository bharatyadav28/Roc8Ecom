"use client";
import { useRouter } from "next/navigation";

import AuthForm from "../../_components/AuthForm";
import useHttp from "../../_hooks/use-http";
import { errorToast } from "~/helpers/toasts";

const Signup = () => {
  const { dbConnect, isLoading, error, setError } = useHttp();
  const router = useRouter();

  const checkResultType = (obj: unknown): obj is { email: string } => {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "email" in obj &&
      typeof obj.email === "string"
    );
  };

  const handleSignup = async (submittedData: unknown) => {
    const handleSuccess = (data: unknown) => {
      if (checkResultType(data)) {
        router.push(`/verifyemail?email=${data.email}`);
      }

      return;
    };

    await dbConnect(
      { path: "/api/signup", method: "POST", payload: submittedData },
      handleSuccess,
    );
  };

  if (error) {
    errorToast(error);
    setError("");
  }

  return (
    <div className="mb-10  mt-10 flex h-max w-screen flex-col  items-center justify-center ">
      <AuthForm
        onSubmition={handleSignup}
        typeForm="signup"
        loading={isLoading}
      />
    </div>
  );
};

export default Signup;
