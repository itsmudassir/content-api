import ButtonPrimary from "../../components/Button/ButtonPrimary";
import Input from "../../components/Input/Input";
import Label from "../../components/Label/Label";
import React, { useState } from "react";
import { accountService } from "../../authentication/_services/account.Service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cogoToast from "cogo-toast";
import ReactLoading from "react-loading";
import confirmAlert from "../../app/confirmAlert";

const updateValidationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required").min(2).max(20),
  lastName: yup.string().required("Last name is required").min(2).max(20),
  password: yup.string().max(20),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], 'Passwords must match'),
});

const EditUserProfile = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);

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

    if (fields.password) {
      confirmAlert("Are you sure you want to change password?", async () => {
        setIsLoading(true);
        accountService
          .update(user.id, fields)
          .then(() => {
            cogoToast.success("Updated successfully");
            history.push(".");
            setIsLoading(false);
          })
          .catch((error) => {
            cogoToast.error(error);
            setIsLoading(false);
          });
      });
    } else {
      setIsLoading(true);
      accountService
        .update(user.id, fields)
        .then(() => {
          cogoToast.success("Updated successfully");
          history.push(".");
          setIsLoading(false);
        })
        .catch((error) => {
          cogoToast.error(error);
          setIsLoading(false);
        });
    }
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
            "Update profile"
          )}
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default EditUserProfile;
