"use client";

import { Suspense } from "react";
import VerifyEmailSuspense from "~/app/_components/VerifyEmailSuspense";

const VerifyEmail: React.FC = () => {
  return (
    <Suspense>
      <VerifyEmailSuspense />
    </Suspense>
  );
};

export default VerifyEmail;
