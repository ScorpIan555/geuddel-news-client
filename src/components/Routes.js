import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import {
  AppliedRoute,
  AuthenticatedRoute,
  NotFound,
  LoadingComponent
} from './presentation';

import { Topic } from './containers';

const AsyncSettings = Loadable({
  loader: () => import('./containers/Settings'),
  loading: LoadingComponent
});

const AsyncSignup = Loadable({
  loader: () => import('./containers/Signup'),
  loading: LoadingComponent
});

const AsyncLogin = Loadable({
  loader: () => import('./containers/Login'),
  loading: LoadingComponent
});

const AsumcForgotPassword = Loadable({
  loader: () => import('./containers/ForgotPassword'),
  loading: LoadingComponent
});

export default ({ childProps }) => {
  const sidebarTop = childProps.sidebarTop;
  const sidebarBottom = childProps.sidebarBottom;
  // let topic = sidebarBottom[i].name.toLowerCase();

  return (
    <Switch>
      <AppliedRoute exact path="/" component={Topic} props={childProps} />
      <AppliedRoute
        exact
        path="/signup"
        component={AsyncSignup}
        props={childProps}
      />
      <AppliedRoute
        exact
        path="/login"
        component={AsyncLogin}
        props={childProps}
      />
      <AuthenticatedRoute
        exact
        path="/settings"
        component={AsyncSettings}
        props={childProps}
      />
      <AuthenticatedRoute
        exact
        path="/forgot-password"
        component={AsumcForgotPassword}
        props={childProps}
      />
      {/* <AppliedRoute exact path={`/topic/${topic}`} component={Topic} props={childProps} /> */}

      {sidebarBottom.map((link, i) => {
        let topic = sidebarBottom[i].name.toLowerCase();
        return (
          <AppliedRoute
            path={`/topic/${topic}`}
            // as={`/topic/${topic}`}
            key={i * Math.random() * 100000000}
            pageTitle={link.name}
            exact
            cProps={childProps}
            component={Topic}
            render={props => {
              <Topic pageTitle={sidebarBottom[i].name} props={props} />;
            }}
          />
        );
      })}

      <Route component={NotFound} />
    </Switch>
  );
};
