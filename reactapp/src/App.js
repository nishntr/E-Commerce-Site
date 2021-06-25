import React from 'react'
import Dashboard from "./components/homepage/dashboard";
import Header from './components/header';
import Login from './components/auth/login';
import Register from './components/auth/register';

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <Router>
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
