import React, { useState } from "react";
import LayoutPage from "../../components/LayoutPage/LayoutPage";
import Input from "../../components/Input/Input";
import ButtonPrimary from "../../components/Button/ButtonPrimary";
import NcLink from "../../components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { accountService } from "../../authentication/_services/account.Service";
import cogoToast from "cogo-toast";
import ReactLoading from "react-loading";

const emailValidation = yup.object().shape({
  email: yup.string().email("Must be an Email").required("Email is required"),
});

const PageForgotPass = ({ className = "" }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailValidation),
  });

  function onSubmit({ email }) {
    setIsLoading(true);
    accountService
      .forgotPassword(email)
      .then(() => {
        cogoToast.success("Please visit your email to verify.", {hideAfter:4});
        setIsLoading(false);
      })
      .catch((error) => {
        cogoToast.error(error);
        setIsLoading(false);
      });
  }

  return (
    <div
      className={`nc-PageForgotPass ${className}`}
      data-nc-id="PageForgotPass"
    >
      <Helmet>
        <title>Forgot Password || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
        subHeading="We will sent reset password instruction to your email"
        headingEmoji="🔐"
        heading="Forgot password"
      >
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6">
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
                "Continue"
              )}
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Go back for {` `}
            <NcLink to="/login">Sign in</NcLink>
            {` / `}
            <NcLink to="/signup">Sign up</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageForgotPass;
