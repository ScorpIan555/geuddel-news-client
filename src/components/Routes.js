import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppliedRoute, AuthenticatedRoute, NotFound } from './presentation';
import { Topic, Signup, Login, Settings, ForgotPassword } from './containers';

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
        component={Signup}
        props={childProps}
      />
      <AppliedRoute exact path="/login" component={Login} props={childProps} />
      <AuthenticatedRoute
        exact
        path="/settings"
        component={Settings}
        props={childProps}
      />
      <AuthenticatedRoute
        exact
        path="/forgot-password"
        component={ForgotPassword}
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
