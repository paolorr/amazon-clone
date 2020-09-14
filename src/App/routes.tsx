import React, { useLayoutEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import Header from '../Header';
import Home from '../Home';
import Checkout from '../Checkout';
import Login from '../Login';

const Routes: React.FC = () => {
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search, hash]);

  return (
    <Switch>
      <Route path="/" exact>
        <Header />
        <Home />
      </Route>
      <Route path="/checkout" exact>
        <Header />
        <Checkout />
      </Route>
      <Route path="/login" exact component={Login} />
      <Route>
        <h1>Page not found</h1>
      </Route>
    </Switch>
  );
};

export default Routes;
