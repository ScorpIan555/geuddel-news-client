import React from 'react';
import { Route } from 'react-router-dom';

export default ({component: Component, props: childProps, ...rest}) => {
    <Route {...rest} render={routeProps => {
        return (
            <Component {...routeProps} {...childProps} />
        );
    }} />
};