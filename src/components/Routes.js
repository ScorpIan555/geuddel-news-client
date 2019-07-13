import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppliedRoute } from './presentation'
import { Topic } from './containers';

export default ({ childProps }) => {
    <Switch>
        <AppliedRoute exact path='/' component={Topic} />
    </Switch>
}