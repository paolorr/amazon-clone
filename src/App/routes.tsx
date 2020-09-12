import React, { useLayoutEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import Home from '../Home';
import Checkout from '../Checkout';

const Routes: React.FC = () => {
  const { pathname, search, hash } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search, hash]);

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/checkout" exact component={Checkout} />
      <Route>
        <h1>Page not found</h1>
      </Route>
    </Switch>
  );
};

export default Routes;
