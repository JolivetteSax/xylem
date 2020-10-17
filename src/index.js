import React from 'react';
import './stylesheets/index.css';

import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
// You can choose your kind of history here (e.g. browserHistory)
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Vacuum from './pages/Vacuum';
import Welcome from './pages/Welcome';

ReactDOM.render(
  <Router>
  <Switch>
    <Route exact path="/" component={Welcome} />
    <Route exact path="/calc/vacuum" component={Vacuum} />

  </Switch>
  </Router>,
  document.getElementById('root')
);


serviceWorker.register();
