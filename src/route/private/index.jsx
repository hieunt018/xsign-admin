import React, { useEffect } from 'react';
import { getToken } from '../../utils/token';
import { Route, Navigate } from 'react-router-dom';
import { NotFound } from '../../component/NotFound';


export function PrivateRoute(props) {
  const path = window.location.pathname;

  const checkAccess = props.path === '/'
      ? true
      : false;

  const condition = getToken() ? true : false;

  useEffect(() => {
    if (condition && checkAccess && props.path !== '/') {
      document.title = "X-sign management";
    }
  }, [path]);

  return condition ? (
    checkAccess ? (
      <Route path={props.path} element={props.element}>
        {props.element}
      </Route>
    ) : (
      <Route path='*' component={NotFound}></Route>
    )
  ) : (
    <Navigate to={{ pathname: '/login' }} />
  );
}
