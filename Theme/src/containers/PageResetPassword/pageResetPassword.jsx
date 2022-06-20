import LayoutPage from "../../components/LayoutPage/LayoutPage";
import React, { useState, useEffect } from "react";
import queryString from "query-string";
import Input from "../../components/Input/Input";
import ButtonPrimary from "../../components/Button/ButtonPrimary";
import NcLink from "../../components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { accountService } from "../../authentication/_services/account.Service";
import cogoToast from "cogo-toast";
import ReactLoading from "react-loading";

const passwordValidation = yup.object().shape({
  password: yup.string().required("Password is required").min(6).max(20),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], 'Passwords must match')
    .required("Confirm password is required"),
});

const PageResetPassword = ({ history, location, className = "" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const TokenStatus = {
    Validating: "Validating",
    Valid: "Valid",
    Invalid: "Invalid",
  };

  const [token, setToken] = useState(null);
  const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordValidation),
  });

  useEffect(() => {
    const { token } = queryString.parse(window.location.search);

    // remove token from url to prevent http referer leakage
    history.replace(window.location.pathname);

    accountService
      .validateResetToken(token)
      .then(() => {
        setToken(token);
        setTokenStatus(TokenStatus.Valid);
      })
      .catch((err) => {
        setTokenStatus(TokenStatus.Invalid);
      });
  }, []);

  function getForm() {
    function onSubmit({ password, confirmPassword }) {
      setIsLoading(true);
      accountService
        .resetPassword({ token, password, confirmPassword })
        .then(() => {
          cogoToast.success("Password reset successful, you can now login");
          history.push("login");
          setIsLoading(false);
        })
        .catch((error) => {
          // setSubmitting(false);
          cogoToast.error(error);
          setIsLoading(false);
        });
    }

    // function onSubmit(data){console.log(data)}

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
              <h1 className="text-2xl">Reset Password</h1>
            </div>
            {/* FORM */}
            <form className="grid grid-cols-1 gap-6">
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Password
                </span>
                <Input
                  type="password"
                  placeholder="example: william123"
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
                  "Reset Password"
                )}
              </ButtonPrimary>
            </form>

            {/* ==== */}
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              Dont want to reset? {` `}
              <NcLink to="login" className="btn btn-link">
                Cancel
              </NcLink>
            </span>
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              New user? {` `}
              <NcLink to={`register`}>Create an account</NcLink>
            </span>
          </div>
        </LayoutPage>
      </div>
    );
  }

  function getBody() {
    switch (tokenStatus) {
      case TokenStatus.Valid:
        return getForm();
      case TokenStatus.Invalid:
        return (
          <div>
            Token validation failed, if the token has expired you can get a new
            one at the <Link to="forgot-password">forgot password</Link> page.
          </div>
        );
      case TokenStatus.Validating:
        return <div>Validating token...</div>;
    }
  }

  return (
    <div>
      <h3 className="card-header">Reset Password</h3>
      <div className="card-body">{getBody()}</div>
    </div>
  );
};

export default PageResetPassword;
