import React, { useRef, useState } from "react";
import Link from "next/link";

import { isEmail, isThreeChars, isSixChars } from "~/helpers/inputValidators";
import useInput from "../_hooks/use-input";
import Card from "./_UI/Card";

const AuthForm: React.FC<{
  onSubmition: (submittedData: unknown) => void;
  typeForm: string;
  loading: boolean;
}> = ({ onSubmition, typeForm, loading }) => {
  const {
    input: nameInput,
    setinput: setNameInput,
    inputTouched: nameTouched,
    setInputTouched: setNameTouched,
    isInputValid: isNameValid,
    inputHasError: nameHasError,
  } = useInput(isThreeChars);

  const {
    input: emailInput,
    setinput: setEmailInput,
    inputTouched: emailTouched,
    setInputTouched: setEmailTouched,
    isInputValid: isEmailValid,
    inputHasError: emailHasError,
  } = useInput(isEmail);

  const {
    input: passwordInput,
    setinput: setPasswordInput,
    inputTouched: passwordTouched,
    setInputTouched: setPasswordTouched,
    isInputValid: isPasswordValid,
    inputHasError: passwordHasError,
  } = useInput(isSixChars);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submittedData = {
      name: typeForm === "signup" ? nameInput?.trim() : null,
      email: emailInput?.trim(),
      password: passwordInput?.trim(),
    };

    setNameInput("");
    setEmailInput("");
    setPasswordInput("");

    setNameTouched(false);
    setEmailTouched(false);
    setPasswordTouched(false);

    onSubmition(submittedData);
  };
  const isFormValid =
    (typeForm === "signup" ? isNameValid : true) &&
    isPasswordValid &&
    isEmailValid;

  return (
    <Card>
      <form onSubmit={handleFormSubmit} className=" mx-6 rounded-lg bg-white  ">
        <p className="mb-7 mt-2 text-center text-3xl font-[620]">
          {typeForm === "signup" ? "Create your account" : "Login"}
        </p>
        {typeForm !== "signup" && (
          <p className="mb-1  text-center text-2xl font-semibold">
            Welcome Back to ECOMMERCE
          </p>
        )}
        {typeForm !== "signup" && (
          <p className="mb-4  text-center text-lg font-normal">
            The next gen business marketplace
          </p>
        )}

        {typeForm === "signup" && (
          <div className="my-3 flex flex-col">
            <label htmlFor="name" className="mb-1 font-semibold">
              Name
            </label>
            <input
              className="inputs"
              type="text"
              id="name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onBlur={() => setNameTouched(true)}
              placeholder="Enter"
            />
            {nameHasError && <p className="input-error">Name is not valid.</p>}
          </div>
        )}

        <div className="my-3 flex flex-col">
          <label htmlFor="email" className="mb-1 font-semibold">
            Email{" "}
          </label>
          <input
            className="inputs"
            type="text"
            id="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            onBlur={() => setEmailTouched(true)}
            placeholder="Enter"
          />
          {emailHasError && <p className="input-error">Email is not valid.</p>}
        </div>

        <div className="my-2 flex flex-col">
          <label htmlFor="password" className="mb-1  font-semibold">
            Password
          </label>
          <input
            className="inputs"
            type="password"
            id="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onBlur={() => setPasswordTouched(true)}
            placeholder="Enter"
          />
          {passwordHasError && (
            <p className="input-error">Password is not valid.</p>
          )}
        </div>

        <div className="mt-5 flex justify-center">
          <input
            type="submit"
            disabled={!isFormValid}
            value={
              loading
                ? "Submitting..."
                : typeForm === "signup"
                  ? "SIGNUP"
                  : "LOGIN"
            }
            className="w-full cursor-pointer rounded-md border bg-black px-4 py-4 text-white hover:bg-orange-600 disabled:cursor-not-allowed   "
          />
        </div>
        <hr className="text-orange-400" />
      </form>
      <hr className="mx-12 my-4 border-t-2 border-slate-300" />
      <div className="mt-5 flex justify-center text-sm font-semibold">
        {typeForm === "signup" && (
          <p>
            Have an account?
            <Link
              href="/login"
              className="ml-1 text-black hover:text-orange-500"
            >
              LOGIN
            </Link>
          </p>
        )}

        {typeForm === "login" && (
          <p>
            Don&apos;t Have An Account?
            <Link
              href="/signup"
              className="ml-1 text-black hover:text-orange-500"
            >
              SIGN UP
            </Link>
          </p>
        )}
      </div>
    </Card>
  );
};

export default AuthForm;
