import React from 'react';

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../MSAD";
import { Button } from "react-bootstrap";
import Layout from '../components/Layout';

export default function Login() {

  const { instance } = useMsal();

  const handleLogin = (loginType) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch(e => {
        console.log(e);
      });
    }
  };

  const handleLogout = (logoutType) => {
  if (logoutType === "popup") {
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/" // redirects the top level app after logout
    });
  }
}

  return (
    <Layout>
      <Button variant="secondary" className="ml-auto" onClick={() => handleLogin("popup")}>Sign in using Popup</Button>
      <Button variant="secondary" className="ml-auto" onClick={() => handleLogout("popup")}>Sign out using Popup</Button>
    </Layout>
  );
};
