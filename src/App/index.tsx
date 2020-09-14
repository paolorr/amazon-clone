import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from '../globalStyles';
import Routes from './routes';

import { AuthProvider } from '../auth';
import { CartProvider } from '../cart';

import { Container } from './styles';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <AuthProvider>
        <CartProvider>
          <Container>
            <Routes />
          </Container>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
