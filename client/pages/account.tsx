import React, { useState } from 'react';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "../MSAD";
import { Alert, Button, Form } from "react-bootstrap";
import Layout from '../components/Layout';

export default function Login() {

  const { instance, accounts } = useMsal();
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
        postLogoutRedirectUri: '',
        mainWindowRedirectUri: '', // redirects the top level app after logout
      });
    }
  }

  return (
    <Layout>
      <h1>🐬 Account</h1>
      <AuthenticatedTemplate>
        <Alert variant="primary">You are signed in!</Alert>
        <Button variant="danger" className="ml-auto" onClick={() => handleLogout("popup")} size="sm">Sign out using Popup</Button>
        <h2 className="mt-3">Welcome &quot;{name}&quot;</h2>
        <div>
          {accessToken ?
            <div className='mt-3'>
              <p>Access Token Acquired!</p>
              <Form.Control as="textarea" rows={5} value={accessToken.split('').map((letter: string) => {
                if (Math.random() > 0.5) {
                  return '*';
                } else {
                  return letter;
                }
              }).join('')} disabled />
            </div>
            :
            <Button variant="info" className='mt-3' onClick={RequestAccessToken}>Request Access Token</Button>
          }
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Alert variant="warning">You are not signed in! Please sign in.</Alert>
        <Button variant="secondary" className="ml-auto" onClick={() => handleLogin("popup")}>Sign in using Popup</Button>
      </UnauthenticatedTemplate>
    </Layout>
  );
};
