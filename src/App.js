import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import { MainLayout } from "./component/MainLayout"
import { Login } from "./component/Login";

const App = () => (
  <div>
      <Router>
        <Routes>
          <Route path='/' element={<MainLayout/>} exact={true}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </Router>
    </div>
);

export default App;
