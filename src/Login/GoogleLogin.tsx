import React, { useContext, useEffect, useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { SuccessToaser } from "../CommonComponents/Toast";
import { LOGIN, LOGOUT } from "../States/ActionTypes";
import { AppContext } from "../States/AppProvider";

interface onLoginSuccess {
  onLoginSuccessHandler(): any;
}
const GoogleLoginPage = (params: onLoginSuccess) => {


  const OnSuccessfulLogin = (credentialResponse: any) => {
    var credata = jwt_decode(credentialResponse.credential);
    //console.log(credentialResponse.credential);
    //console.log(credata);
    SuccessToaser("Welcome " + (credata as any).name);
    params.onLoginSuccessHandler();

dispatch({
      type: LOGIN,
      payload: { active: true
        , username: (credata as any).name
        ,Image:(credata as any).picture
        ,emailId:(credata as any).emailId},
    });
  };

  const { state, dispatch } = useContext(AppContext);
  const { user } = state;

  const OnFailedLogin = () => {
    console.log("Login Failed");
  };
  return (
    <div className="App">
      <header className="App-header">
        <GoogleOAuthProvider clientId="976893488082-ot66vapgl55ra1t5nsl4l29qggb9qh58.apps.googleusercontent.com">
          <GoogleLogin onSuccess={OnSuccessfulLogin} onError={OnFailedLogin} />
        </GoogleOAuthProvider>
      </header>
    </div>
  );
};
export default GoogleLoginPage;
