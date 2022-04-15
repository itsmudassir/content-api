import ButtonPrimary from "../../components/Button/ButtonPrimary";
import Input from "../../components/Input/Input";
import Label from "../../components/Label/Label";
import React, { useState } from "react";
import { accountService } from "../../authentication/_services/account.Service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cogoToast from "cogo-toast";

const updateValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(4)
    .max(20)
    .required("First name is required")
    .min(4)
    .max(30),
  lastName: yup
    .string()
    .min(4)
    .max(20)
    .required("Last name is required")
    .min(4)
    .max(30),
  password: yup.string().max(20),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

const EditUserProfile = ({ history }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateValidationSchema),
  });
  const user = accountService.userValue;


  const onSubmit = (fields) => {
    // password validation
    if (fields.password) {
      if (fields.password.length < 6) {
        cogoToast.error("Password must be greater than 6 characters");
        return null;
      }
      if (fields.password.includes("  ")) {
        cogoToast.error("Password must be a valid password");
        return null;
      }
    }

    accountService
      .update(user.id, fields)
      .then(() => {
        cogoToast.success("Updated successfully");
        history.push(".");
      })
      .catch((error) => {
        cogoToast.success(error);
      });

  };


  return (
    <div className="px-8 sm:px-24 md:px-20 lg:px-32 xl:px-72 py-20 rounded-xl md:border md:border-neutral-100 dark:border-neutral-800">
      <form className="grid md:grid-cols-2 gap-6">
        <label className="block">
          <Label>First name</Label>
          <Input
            placeholder="Example Doe"
            type="text"
            className="mt-1 border-slate-300"
            defaultValue={user.firstName}
            {...register("firstName")}
          />
          <p className="mt-1 ml-4 text-red-500 text-sm">
            {errors.firstName?.message}
          </p>
        </label>

        <label className="block">
          <Label>Last name</Label>
          <Input
            placeholder="Doe"
            type="text"
            className="mt-1 border-slate-300"
            defaultValue={user.lastName}
            {...register("lastName")}
          />
          <p className="mt-1 ml-4 text-red-500 text-sm">
            {errors.lastName?.message}
          </p>
        </label>

        <label className="block">
          <Label>Email</Label>
          <Input
            disabled
            placeholder="***"
            type="email"
            className="mt-1 text-gray-400 border-slate-300"
            defaultValue={user.email}
          />
        </label>

        <label className="block">
          <Label>Change password</Label>
          <Input
            type="password"
            className="mt-1 border-slate-300"
            placeholder="Leave blank to keep the same password"
            {...register("password")}
          />
          <p className="mt-1 ml-4 text-red-500 text-sm">
            {errors.password?.message}
          </p>
        </label>

        <label className="block">
          <Label>Confirm password</Label>
          <Input
            type="password"
            className="mt-1 border-slate-300"
            {...register("confirmPassword")}
          />
          <p className="mt-1 ml-4 text-red-500 text-sm">
            {errors.confirmPassword?.message}
          </p>
        </label>

        <ButtonPrimary
          onClick={handleSubmit(onSubmit)}
          className="md:col-span-2 "
        >
          Update profile
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default EditUserProfile;