import { useState } from "react";

interface dbConfig {
  path: string;
  method: string;
  payload: unknown;
}

interface errorType {
  msg: string;
  [key: string]: unknown;
}

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const dbConnect = async (
    { path, method, payload }: dbConfig,
    postRequest: (data: unknown) => void,
  ) => {
    try {
      setIsLoading(true);
      const res = await fetch(path, {
        method: method ? method : "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload ? JSON.stringify(payload) : null,
      });

      if (!res.ok) {
        const error = (await res.json()) as errorType;
        const errorMsg = error.msg;
        throw new Error(errorMsg);
      }

      const result: unknown = await res.json();
      postRequest(result);
    } catch (error: unknown) {
      let message = "An error occurred";
      if (error instanceof Error) {
        message = error.message;
      }
      setError(message);
    }
    setIsLoading(false);
  };
  return {
    dbConnect,
    isLoading,
    error,
    setError,
  };
};

export default useHttp;
