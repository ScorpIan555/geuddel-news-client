import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppliedRoute, NotFound } from './presentation';
import { Topic, Signup, Login } from './containers';

export default ({ childProps }) => {

    return(
        <Switch>
            <AppliedRoute exact path='/' component={Topic} props={childProps} />
            <AppliedRoute exact path='/signup' component={Signup} props={childProps} />
            <AppliedRoute exact path='/login' component={Login} props={childProps} />
            <Route component={NotFound} />
        </Switch>
    )
    
       
    
  
}