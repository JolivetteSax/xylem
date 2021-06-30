import React from 'react';

import ReactDOM from 'react-dom';

//Taking this out to try to allow soft refreshes
//import * as serviceWorker from './serviceWorker';

// You can choose your kind of history here (e.g. browserHistory)
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Vacuum from './pages/Vacuum';
import Welcome from './pages/Welcome';
import Tubing from './pages/Tubing';
import SapPricing from './pages/SapPricing';
import FuelCosts from './pages/FuelCosts';
import ProductPricing from './pages/ProductPricing';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Router>
  <Switch>
    <Route exact path="/" component={Welcome} />
    <Route exact path="/calc/vacuum" component={Vacuum} />
    <Route exact path="/calc/sapPricing" component={SapPricing} />
    <Route exact path="/calc/tubing" component={Tubing} />
    <Route exact path="/calc/fuel" component={FuelCosts} />
    <Route exact path="/calc/productPricing" component={ProductPricing} />
  </Switch>
  </Router>,
  document.getElementById('root')
);


//serviceWorker.register();
