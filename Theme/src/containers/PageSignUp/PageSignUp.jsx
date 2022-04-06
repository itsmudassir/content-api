import React, { useState } from "react";
import LayoutPage from "../../components/LayoutPage/LayoutPage";
import facebookSvg from "../../images/Facebook.svg";
import twitterSvg from "../../images/Twitter.svg";
import googleSvg from "../../images/Google.svg";
import Input from "../../components/Input/Input";
import ButtonPrimary from "../../components/Button/ButtonPrimary";
import NcLink from "../../components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import Select from "../../components/Select/Select";
import { accountService } from "../../authentication/_services/account.Service";
import { alertService } from "../../authentication/_services/alert.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cogoToast from "cogo-toast";

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const registerValidationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required").min(4).max(20),
  lastName: yup.string().required("Last name is required").min(4).max(20),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a proper email"),
  password: yup.string().required("password is required").min(6).max(20),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Confirm password is required"),
});

const PageSignUp = ({ className = "", history }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
  });

  const title = "Mr";

  function onSubmit(values) {
    accountService
      .register({ ...values, title })
      .then(() => {
        cogoToast.success("loggedin successfully");
        history.push("login");
      })
      .catch((error) => {
        cogoToast.error(error)
      });
  }

  // const onSubmit = (values)=>{
  //   console.log(values);
  // }

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
            {/* {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))} */}
          </div>

          {/* OR */}
          {/* <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div> */}

          {/* FORM */}
          <form className="grid grid-cols-1 gap-6">
            {/* <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Select Title
              </span>
              <Select
                className="rounded-3xl mt-1 bg-white border-slate-200"
                onChange={(e) => setTitle(e.target.value)}
              >
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
                <option value="Ms">Ms</option>
              </Select>
            </label> */}

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
              Register
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
