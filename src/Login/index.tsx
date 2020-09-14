import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../auth';

import { Container, LoginInfo } from './styles';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { signIn, signUp } = useAuth();

  const handleSignIn = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      try {
        await signIn({ email, password });
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [email, password, history, signIn],
  );

  const handleCreateAccount = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      try {
        await signUp({ email, password });
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [email, password, history, signUp],
  );

  return (
    <Container>
      <Link to="/">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" />
      </Link>

      <LoginInfo>
        <h1>Sign in</h1>

        <form>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button type="submit" onClick={handleSignIn}>
            Sign in
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button onClick={handleCreateAccount}>
          Create your Amazon Account
        </button>
      </LoginInfo>
    </Container>
  );
};

export default Login;
