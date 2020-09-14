import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../Contexts/auth';

import { Container, LoginInfo } from './styles';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const history = useHistory();
  const { signIn, signUp } = useAuth();
  const [newAccount, setNewAccount] = useState(false);

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

  const handleSignUp = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
        await signUp({ email, password, name });
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [email, password, history, signUp, name],
  );

  const handleCreateAccount = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setNewAccount(true);
    },
    [],
  );

  const handleHaveAccount = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setNewAccount(false);
    },
    [],
  );

  return (
    <Container>
      <Link to="/">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" />
      </Link>

      <LoginInfo>
        <h1>{!newAccount ? 'Sign in' : 'Create account'}</h1>

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
          {newAccount && (
            <>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </>
          )}

          {!newAccount && (
            <button type="submit" onClick={handleSignIn}>
              Sign in
            </button>
          )}

          {newAccount && (
            <button type="submit" onClick={handleSignUp}>
              Create account
            </button>
          )}
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        {!newAccount && (
          <button onClick={handleCreateAccount}>
            Create your Amazon Fake Account
          </button>
        )}

        {newAccount && (
          <button onClick={handleHaveAccount}>Have an account? Sign in</button>
        )}
      </LoginInfo>
    </Container>
  );
};

export default Login;
