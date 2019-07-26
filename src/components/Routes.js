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
            <AppliedRoute exact path='/topic/business' component={Topic} props={childProps} />
            
            {/* { sidebarTop.map((link, i) => {
                let topic = sidebarBottom[i].name.toLowerCase();
                return <AppliedRoute path={`/topic/${topic}`}
                            key={i*Math.random()*100000000}
                            pageTitle={link.name}
                            exact
                            childProps={childProps}
                            render={props => {
                                <Topic
                                    pageTitle={sidebarBottom[i].name}
                                    props={props}
                                    />
                            }}
                        />
            }) 
            } */}

            <Route component={NotFound} />
        </Switch>
    )
    
       
    
  
}