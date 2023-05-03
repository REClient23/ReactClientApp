import { useState } from "react";
import "./LoginForm.css";
import { Button, Label, Popover } from "@blueprintjs/core";
import LeadsLandingPage from '../Leads/LeadsLandingPage';
interface Credentials {
  email: string;
  password: string;
}

interface onLoginSuccess {
  onLoginSuccessHandler(): any;
}

const LoginForm = (params:onLoginSuccess) => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();    
    params.onLoginSuccessHandler();
  };

  return (    
    <div className="main-login-div">
    <form className="login-form" onSubmit={handleSubmit}>
      <h1 className="login-form__title">Sign in</h1>
      <div className="login-form__input-container">
      <Label className="bp4-label" htmlFor="email">
          Email or phone        
        <input
          type="email"
          className="bp4-input"
          id="email"
          name="email"
          value={credentials.email}
          onChange={handleInputChange}
          required
        />
        </Label>
      </div>
      <div className="login-form__input-container">
      <Label className="bp4-label" htmlFor="password">
          Password       
        <input
          type="password"
          className="bp4-input"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
          required
        />
        </Label>
      </div>
      <div className="login-form__checkbox-container">      
        <label className="login-form__checkbox-label" htmlFor="remember-me">
          Remember me
        </label>
        <input type="checkbox" id="remember-me" />
        <a className="login-form__forgot-password" href="/">
          Forgot password?
        </a>
      </div>
       <Button type="submit" intent="primary" icon="log-in" text="Sign in" />                    
    </form>
    </div>
  );
};

export default LoginForm;
