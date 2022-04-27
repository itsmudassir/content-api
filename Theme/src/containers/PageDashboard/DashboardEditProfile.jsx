import ButtonPrimary from "../../components/Button/ButtonPrimary";
import Input from "../../components/Input/Input";
import Label from "../../components/Label/Label";
import React, { useState } from "react";
// import { useUpdateUserMutation } from "../../app/Api/contentApi";

const DashboardEditProfile = () => {
  // const [updateUser, updateUserObj] = useUpdateUserMutation();

  const userData = {
    userId: "62138240d6295e8e3b3a38fc",
    user: {
      email:"saad2@gmail.com",
      password: "",
      firstName: "",
      lastName: "",
      title: "Mr",
    },
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    // updateUser(userData);
    console.log(userData);
  };
  // console.log(updateUserObj);
  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <form className="grid md:grid-cols-2 gap-6">
        <label className="block">
          <Label>First name</Label>
          <Input
            onChange={(e) => (userData.user.firstName = e.target.value)}
            placeholder="Example Doe"
            type="text"
            className="mt-1"
          />
        </label>
        <label className="block">
          <Label>Last name</Label>
          <Input
            onChange={(e) => (userData.user.lastName = e.target.value)}
            placeholder="Doe"
            type="text"
            className="mt-1"
          />
        </label>
        <label className="block">
          <Label>Current password</Label>
          <Input disabled placeholder="***" type="password" className="mt-1" />
        </label>
        <label className="block">
          <Label>New password</Label>
          <Input 
            onChange={(e) => (userData.user.password = e.target.value)}
            type="password"
            className="mt-1"
          />
        </label>

        {/* <label className="block md:col-span-2">
          <Label> Email address</Label>
          <Input
            type="email"
            placeholder="example@example.com"
            className="mt-1"
          />
        </label> */}

        <ButtonPrimary
          onClick={(e) => {
            handelSubmit(e);
          }}
          className="md:col-span-2"
        >
          Update profile
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default DashboardEditProfile;
