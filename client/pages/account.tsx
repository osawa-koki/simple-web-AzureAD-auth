import React, { useState } from 'react';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "../MSAD";
import { Button } from "react-bootstrap";
import Layout from '../components/Layout';

export default function Login() {

  const { instance, accounts, inProgress } = useMsal();
  const [accessToken, setAccessToken] = useState(null);

  const name = accounts[0] && accounts[0].name;

  function RequestAccessToken() {
    const request = {
      ...loginRequest,
      account: accounts[0]
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance.acquireTokenSilent(request).then((response) => {
      setAccessToken(response.accessToken);
    }).catch((e) => {
      console.log(e);
      instance.acquireTokenPopup(request).then((response) => {
        setAccessToken(response.accessToken);
      });
    });
  }

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
      <AuthenticatedTemplate>
        <p>You are signed in!</p>
        <Button variant="secondary" className="ml-auto" onClick={() => handleLogout("popup")}>Sign out using Popup</Button>
        <h5 className="card-title">Welcome {name}</h5>
        <div>
          {accessToken ?
            <p>Access Token Acquired!</p>
            :
            <Button variant="secondary" onClick={RequestAccessToken}>Request Access Token</Button>
          }
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>You are not signed in! Please sign in.</p>
        <Button variant="secondary" className="ml-auto" onClick={() => handleLogin("popup")}>Sign in using Popup</Button>
      </UnauthenticatedTemplate>
    </Layout>
  );
};
