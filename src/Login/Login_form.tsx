import React, { useState } from 'react';

interface onLoginSuccess {
    onLoginSuccessHandler(): any;
  }

const Login_Form = (params:onLoginSuccess) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`Username: ${username}\nPassword: ${password}`);
    params.onLoginSuccessHandler();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Sign in to Outlook</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <label htmlFor="username" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Email or username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          style={{ marginBottom: '1rem', padding: '0.5rem', fontSize: '1rem' }}
        />
        <label htmlFor="password" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          style={{ marginBottom: '1rem', padding: '0.5rem', fontSize: '1rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem', backgroundColor: '#0078D4', color: 'white', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold' }}>Sign in</button>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
          <input type="checkbox" id="remember-me" style={{ marginRight: '0.5rem' }} />
          <label htmlFor="remember-me" style={{ fontSize: '0.875rem' }}>Remember me</label>
          <a href="#" style={{ marginLeft: 'auto', fontSize: '0.875rem' }}>Need help?</a>
        </div>
      </form>
    </div>
  );
};

export default Login_Form;
