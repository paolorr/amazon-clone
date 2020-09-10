import React from 'react';

import GlobalStyle from '../globalStyles';
import Header from '../Header';
import Home from '../Home';

import { Container } from './styles';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Container>
      <Header />
      <Home />
    </Container>
  </>
);

export default App;
