import React, { Component } from 'react';
import { connect } from 'react-redux';
import Routes from './Routes';
import { Nav, Footer } from './presentation';
// import { Sidebar, Topic, Signup, Login } from './containers';
import actions from '../actions';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router-dom';
import { join } from 'path';
// import { Auth, API } from 'aws-amplify';

class App extends Component {
    state = {
        isAuthenticated: false,
        isAuthenticating: true,
    };

   async componentDidMount() {

        // when user navigates to the app, this component will always need to mount, therefore
        // we want the component to check for a currentUser
        try {
            await this.props.getCurrentUser();
            console.log('App.componentDidMount()', this); // delete after dev
            console.log('App.componentDidMount.currentUser', this.props.currentUser); // delte after dev
            
            if(this.props.currentUser.email !== 'No current user') {
                console.log('testing this.props.user.currentUser:::', this.props.currentUser);
                this.userHasAuthenticated(true);
            }
            
        } catch (error) {
            console.log('error:::', error);
        }

        this.setState({isAuthenticating: false});

        this.props.getNews();
        console.log('App.componentDidMount()', this);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.currentUser != this.props.currentUser) {
            this.props.getNews();
        }
      }

    userHasAuthenticated = authenticated => {
        this.setState({
            isAuthenticated: authenticated
        });
    }

    handleLogout = async event => {
        await Auth.signOut();

        this.userHasAuthenticated(false);

        // this.props.history.push('/');
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
        let { handleClick, userHasAuthenticated, handleLogout } = this;
        // deconstruct and assign state
        let { isAuthenticated } = this.state;
        // deconstruct and assign props
        let { sidebarTop, sidebarBottom } = this.props;
        // create childProps object to be passed into sidebar component
        const sidebarChildProps = {  // @TODO 
            sidebarTop,
            sidebarBottom,
            handleClick
        };

        let childProps = {
            isAuthenticated,
            userHasAuthenticated,
            handleLogout
        }

        return (
        <div className="container">

            <Nav props={childProps} />
            
            <div className="main-container">
                <div>
                    <Routes childProps={childProps} />
                </div>
                
                <Footer />

            </div>
        </div>
        );
    }
}

const stateToProps = state => {
  const { topLink, bottomLink } = state.sidebar;
  const { currentUser } = state.auth;

  return {
    sidebarTop: topLink,
    sidebarBottom: bottomLink,
    user: state.auth,
    currentUser: currentUser
  };
};

const dispatchToProps = dispatch => {
  return {
    test: (data) => dispatch(actions.actionTest(data)),
    getNews: (data) => dispatch(actions.actionGetNews(data)),
    getCurrentUser: () => dispatch(actions.actionGetCurrentUser()),
    signOut: () => dispatch(action.actionSignOutUser())
  };
};

export default connect(stateToProps, dispatchToProps)(withRouter(App));
