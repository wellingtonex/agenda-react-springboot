import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import Clientes from './pages/cliente/Index';
import CadastroClientes from './pages/cliente/Add';
import SignIn from './pages/sign-in/Signin';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/clientes" />
      <Route exact path="/login" component={SignIn} />
      <PrivateRoute exact path="/clientes" component={Clientes} />
      <PrivateRoute exact path="/clientes/add" component={CadastroClientes} />
      <PrivateRoute exact path="/clientes/add/:id" component={CadastroClientes} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;