import React, { useState } from "react";
import LayoutPage from "../../components/LayoutPage/LayoutPage";
import Input from "../../components/Input/Input";
import ButtonPrimary from "../../components/Button/ButtonPrimary";
import NcLink from "../../components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import { accountService } from "../../authentication/_services/account.Service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cogoToast from "cogo-toast";
import ReactLoading from "react-loading";

const registerValidationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required").min(2).max(20),
  lastName: yup.string().required("Last name is required").min(2).max(20),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a proper email"),
  password: yup.string().required("Password is required").min(6).max(20),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password", "HI im saad"), null], 'Passwords must match')
    .required("Confirm password is required"),
});

const PageSignUp = ({ className = "", history }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
  });

  const title = "Mr";

  function onSubmit(values) {
    setIsLoading(true);
    accountService
      .register({ ...values, title })
      .then(() => {
        history.push("login");
        setIsLoading(false);
        cogoToast.success("Registered successfully");
      })
      .catch((error) => {
        cogoToast.error(error);
        setIsLoading(false);
      });
  }

  return (
    <div className={`nc-PageSignUp ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
        subHeading="Welcome to our blog magazine Community"
        headingEmoji="🎉"
        heading="Sign up"
      >
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3 flex justify-center mb-12">
            <h1 className="text-2xl">Sign Up</h1>
          </div>

          {/* FORM */}
          <form className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                First Name
              </span>
              <Input
                type="email"
                placeholder="Shane etc."
                className="mt-1"
                {...register("firstName")}
              />
              <p className="mt-1 ml-4 text-red-500 text-sm">
                {errors.firstName?.message}
              </p>
            </label>

            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                last Name
              </span>
              <Input
                type="email"
                placeholder="Watson etc."
                className="mt-1"
                {...register("lastName")}
              />
              <p className="mt-1 ml-4 text-red-500 text-sm">
                {errors.lastName?.message}
              </p>
            </label>

            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                {...register("email")}
              />
              <p className="mt-1 ml-4 text-red-500 text-sm">
                {errors.email?.message}
              </p>
            </label>

            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                type="password"
                className="mt-1"
                {...register("password")}
              />
              <p className="mt-1 ml-4 text-red-500 text-sm">
                {errors.password?.message}
              </p>
            </label>

            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Confirm Password
              </span>
              <Input
                type="password"
                className="mt-1"
                {...register("confirmPassword")}
              />
              <p className="mt-1 ml-4 text-red-500 text-sm">
                {errors.confirmPassword?.message}
              </p>
            </label>

            <ButtonPrimary onClick={handleSubmit(onSubmit)}>
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <p>Loading...</p>&nbsp;&nbsp;
                  <ReactLoading
                    type="spin"
                    color={"white"}
                    height={24}
                    width={24}
                  />
                </div>
              ) : (
                "Register"
              )}
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <NcLink to="/login">Sign in</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageSignUp;
