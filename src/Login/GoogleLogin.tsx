import React, { useContext, useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { ErrorToaser, SuccessToaser } from "../CommonComponents/Toast";
import { LOGIN, LOGOUT } from "../States/ActionTypes";
import { AppContext } from "../States/AppProvider";
import { appBaseURL } from "../CommonComponents/ApplicationConstants";
import { User } from "../AccessManagement/UserMangement/User";

interface onLoginSuccess {
  onLoginSuccessHandler(): any;
}
const GoogleLoginPage = (params: onLoginSuccess) => {
  const OnSuccessfulLogin = (credentialResponse: any) => {
    var credata = jwt_decode(credentialResponse.credential);
    //console.log(credentialResponse.credential);
    console.log(credata);
    selectedCTVData(credata);
  };
  const selectedCTVData = (credata: any) => {
    fetch(appBaseURL + "/api/User/" + `${(credata as any).email}`)
      .then((result) => result.json())
      .then((subrowData: User) => {
        if (subrowData.id !== -1) {
          console.log(subrowData);
          dispatch({
            type: LOGIN,
            payload: {
              active: true,
              username: (credata as any).name,
              Image: (credata as any).picture,
              email: (credata as any).email,
              role: subrowData.role,
            },
          });
          SuccessToaser("Welcome " + (credata as any).name);
          params.onLoginSuccessHandler();
        }
        else
        {
          
          ErrorToaser("Welcome " + (credata as any).name+" Please contact Admin for access");
        }
      })
      .catch((error) => console.log(error));
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
