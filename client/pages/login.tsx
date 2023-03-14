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

  return (
    <Layout>
      <Button variant="secondary" className="ml-auto" onClick={() => handleLogin("popup")}>Sign in using Popup</Button>
    </Layout>
  );
};
