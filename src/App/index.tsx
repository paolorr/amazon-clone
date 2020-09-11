import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from '../globalStyles';
import Routes from './routes';

import { CartProvider } from '../cart';

import Header from '../Header';

import { Container } from './styles';

const App: React.FC = () => (
  <Router>
    <GlobalStyle />
    <CartProvider>
      <Container>
        <Header />
        <Routes />
      </Container>
    </CartProvider>
  </Router>
);

export default App;
