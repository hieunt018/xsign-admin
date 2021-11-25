import React from "react";
import { Button, Select, Row, Col, Switch } from "antd";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import { MainLayout } from "./component/MainLayout"
import { Login } from "./component/Login";
import { PrivateRoute } from './route/private';
// import { MainLayout } from './component/MainLayout';



const App = () => (
  // <>
  //   <FormInput />
  // </>
  <div>
      <Router>
        <Routes>
          <Route path='/' element={<MainLayout/>} exact={true}></Route>
          <Route path='/login' element={<Login/>}></Route>
          {/* <PrivateRoute
            path='/'
            element={<FormInput/>}
          ></PrivateRoute> */}
        </Routes>
      </Router>
    </div>
);

export default App;
