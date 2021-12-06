import React, { useEffect } from 'react';
import { getToken } from '../../utils/token';
import { Route, Redirect } from 'react-router-dom';
import { NotFound } from '../../component/NotFound';
import { MainLayout } from "../../component/MainLayout"

export function PrivateRoute(props) {
  const path = window.location.pathname;

  const pages = ['/', '/x-sign-admin', '/x-sign-admin/login']

  const checkAccess = pages.findIndex((i) => props.path.includes(i)) >= 0 || props.path === '/'
      ? true
      : false;

  const condition = getToken() ? true : false;

  useEffect(() => {
    if (condition && checkAccess && props.path === '/') {
      document.title = "X-sign management";
    }
  }, [path]);

  return condition ? (
    checkAccess ? (
      <Redirect to={{ pathname: '/x-sign-admin' }} />
    ) : (
      <Route path='*' component={NotFound} ></Route>
    )
  ) : (
    <Redirect to={{ pathname: '/x-sign-admin/login' }} />
  );
}
