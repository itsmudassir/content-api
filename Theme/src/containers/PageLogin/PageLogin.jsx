import LayoutPage from "../../components/LayoutPage/LayoutPage";
import React from "react";
import facebookSvg from "../../images/Facebook.svg";
import twitterSvg from "../../images/Twitter.svg";
import googleSvg from "../../images/Google.svg";
import Input from "../../components/Input/Input";
import ButtonPrimary from "../../components/Button/ButtonPrimary";
import NcLink from "../../components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { accountService } from "../../authentication/_services/account.Service";
import { alertService } from "../../authentication/_services/alert.service";
import cogoToast from 'cogo-toast';


const LoginValidationSchema = yup.object().shape({
  email: yup.string().email("Must be an Email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const PageLogin = ({ history, location, className = "" }) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginValidationSchema),
  });

  function onSubmit({ email, password }) {
    alertService.clear();
    accountService
      .login(email, password)
      .then(() => {
        const { from } = location.state || { from: { pathname: "/" } };
        // history.push(from);
        history.push("/");
        cogoToast.success("loggedin successfully")
      })
      .catch((error) => {
        cogoToast.error(error)
      });
  }

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
        subHeading="Welcome to our blog magazine Community"
        headingEmoji="🔑"
        heading="Login"
      >
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3 flex justify-center mb-12">

            <h1 className="text-2xl">Sign In</h1>
          </div>

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
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <NcLink to="forgot-password" className="text-sm">
                  Forgot password?
                </NcLink>
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
            <ButtonPrimary onClick={handleSubmit(onSubmit)}>
              Login
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <NcLink to={`register`}>Create an account</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageLogin;
