import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppliedRoute, NotFound } from './presentation';
import { Topic, Signup, Login } from './containers';

export default ({ childProps }) => {

    const sidebarTop = childProps.sidebarTop
    const sidebarBottom = childProps.sidebarBottom

    return(
        <Switch>
            <AppliedRoute exact path='/' component={Topic} props={childProps} />
            <AppliedRoute exact path='/signup' component={Signup} props={childProps} />
            <AppliedRoute exact path='/login' component={Login} props={childProps} />
            
            { sidebarTop.map((link, i) => {
                let topic = sidebarTop[i].name
                return <AppliedRoute path={'/topics/' + topic}
                            pageTitle={link.name}
                            exact
                            render={props => {
                                <Topic
                                    pageTitle={sidebarTop[i].name}
                                    />
                            }}
                        />
            }) 
            }

            <Route component={NotFound} />
        </Switch>
    )
    
       
    
  
}