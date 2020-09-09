import React from 'react';

import GlobalStyle from '../globalStyles';
import Header from '../Header';

import { Container } from './styles';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Container>
      <Header />
    </Container>
  </>
);

export default App;
