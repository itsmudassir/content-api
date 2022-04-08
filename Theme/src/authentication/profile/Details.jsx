import React from "react";
import { Link } from "react-router-dom";
import { accountService } from "../_services/account.Service";
import ButtonPrimary from "../../components/Button/ButtonPrimary";

function Details({ match, history }) {
  const { path } = match;
  const user = accountService.userValue;

  return (
    <div>
      <h1>My Profile</h1>
      <p>
        <strong>Name: </strong> {user.title} {user.firstName} {user.lastName}
        <br />
        <strong>Email: </strong> {user.email}
      </p>
      <br />

      <ButtonPrimary onClick={()=>history.push("/edit-profile")}>
        Update Profile
      </ButtonPrimary>
    </div>
  );
}

export { Details };
