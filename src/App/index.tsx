import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from '../globalStyles';
import Routes from './routes';

import AppProvider from '../Contexts';

import { Container } from './styles';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <AppProvider>
        <Container>
          <Routes />
        </Container>
      </AppProvider>
    </Router>
  );
};

export default App;
