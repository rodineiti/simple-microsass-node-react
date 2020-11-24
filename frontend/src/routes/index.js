import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './../pages/Home';
import Stats from './../pages/Stats';
import Links from './../pages/Links';
import Redirect from './../pages/Redirect';
import NotFound from '../pages/NotFound';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/list-links" component={Links} />
        <Route exact path="/:code" component={Redirect} />
        <Route exact path="/:code/stats" component={Stats} />
        <Route exact path="/*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}