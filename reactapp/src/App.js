import React from 'react'
import Dashboard from "./components/homepage/dashboard";
import Header from './components/header';
import Login from './components/auth/login';
import Register from './components/auth/register';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import PrivateRoute from './PrivateRoute';

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Cart from './components/cart/cart';

function App() {
  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <React.Fragment>
            <Header />
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/cart" component={Cart} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </React.Fragment>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
