import React from "react";
import { BrowserRouter as Router, Route, Switch,  } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch } from "react-router";
import "./App.css";
import { MainLayout } from "./component/MainLayout"
import { Login } from "./component/Login";
import { PrivateRoute } from "./route/private";

const App = () => (
  <div>
      <Router>
        <Switch>
          <Route path='/x-sign-admin/login' component={Login}></Route>
          <Route path='/x-sign-admin' component={MainLayout} exact={true}></Route>
          <PrivateRoute
            path='/'
            exact={false}
            component={MainLayout}
          ></PrivateRoute>
        </Switch>
      </Router>
    </div>
);

export default App;
