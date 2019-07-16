import React, { Component } from 'react';
import { connect } from 'react-redux';
import Routes from './Routes';
import { Nav, AppliedRoute, NotFound } from './presentation';
import { Sidebar, Topic, Signup, Login } from './containers';
import actions from '../actions';
import { Auth } from 'aws-amplify';
import { Link, withRouter, Switch, Route } from 'react-router-dom';
// import { Auth, API } from 'aws-amplify';

class App extends Component {
    state = {
        isAuthenticated: false
    };

   async componentDidMount() {
        console.log('App.componentDidMount()', this);
        let body = {
            fart: 'plllllffffff',
        };

        this.props.getNews(body);

        
        let username = 'TestIan70@gmail.com';
        let password = 'Gerrard!08';
    

        // Auth.signUp({
        //     username,
        //     password
        // })
        // .then(res => {
        //     console.log('Auth.signup.data:::', res);
        // })
        // .catch(err => {
        //     console.log('error from Auth:::', err);
        // })


        // API.get('gNewsNotes', '/notes')
        // .then(res => {
        //     console.log('res:::', res);
        // })
        // .catch(err => {
        //     console.log('err:::', err);
        // })
        
    }

    userHasAuthenticated = authenticated => {
        this.setState({
            isAuthenticated: authenticated
        });
    }

    handleLogout = async event => {
        await Auth.signOut();

        this.userHasAuthenticated(false);

        this.props.history.push('/login');
    }

    handleClick = event => {
        console.log('Click');
        let data = {
            isItWorking: 'yes, it is working'
        };
        this.props.test(data);
    }
    
    render() {
        // desconstruct and assign class methods
        let { handleClick } = this;
        // deconstruct and assign props to be passed into the sidebar component
        let { sidebarTop, sidebarBottom } = this.props;
        // create childProps object to be passed into sidebar component
        const sidebarChildProps = {
            sidebarTop,
            sidebarBottom,
            handleClick
        };

        let childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated
        }

        return (
        <div className="container">
            <Nav />
            
            <div className="main-container">
                <div>
                <Routes childProps={childProps} />
                </div>
                
                
            <footer className="footer-short">
                <div className="container">
                <hr />
                <nav className="row justify-content-between align-items-center">
                    <div className="col-auto">
                    <ul className="list-inline">
                        <li className="list-inline-item">
                        <a href="#">
                            <img alt="Image" src="assets/img/logo-gray.svg" />
                        </a>
                        </li>
                        <li className="list-inline-item">
                        <a href="#">Overview</a>
                        </li>
                        <li className="list-inline-item">
                        <a href="#">Documentation</a>
                        </li>
                        <li className="list-inline-item">
                        <a href="#">Changelog</a>
                        </li>
                    </ul>
                    </div>

                    <div className="col-auto text-sm-right">
                    <ul className="list-inline">
                        <li className="list-inline-item">
                        <a href="#">
                            <i className="socicon-twitter" />
                        </a>
                        </li>
                        <li className="list-inline-item">
                        <a href="#">
                            <i className="socicon-facebook" />
                        </a>
                        </li>
                    </ul>
                    </div>
                </nav>

                <div className="row">
                    <div className="col">
                    <small>&copy; 2019 Medium Rare All Rights Reserved</small>
                    </div>
                </div>
                </div>
            </footer>
            </div>
        </div>
        );
    }
}

const stateToProps = state => {
  const { topLink, bottomLink } = state.sidebar;

  return {
    sidebarTop: topLink,
    sidebarBottom: bottomLink
  };
};

const dispatchToProps = dispatch => {
  return {
    test: (data) => dispatch(actions.actionTest(data)),
    getNews: (data) => dispatch(actions.actionGetNews(data))
  };
};

export default connect(stateToProps, dispatchToProps)(withRouter(App));
