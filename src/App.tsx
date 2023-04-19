import React from 'react';
import logo from './logo.svg';
import './App.css';
import LandingPage from'./Components/LandingPage'
import LoginForm from './Login/LoginForm';

function App() {
  return (
    <div className="App">
      <LandingPage/>
      <LoginForm/>
    </div>
  );
}

export default App;
