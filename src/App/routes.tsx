import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home';
import Checkout from '../Checkout';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/checkout" exact component={Checkout} />
    <Route>
      <h1>Page not found</h1>
    </Route>
  </Switch>
);

export default Routes;
