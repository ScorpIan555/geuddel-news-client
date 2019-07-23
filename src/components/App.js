import React, { Component } from 'react';
import { connect } from 'react-redux';
import Routes from './Routes';
import { Nav, Footer } from './presentation';
// import { Sidebar, Topic, Signup, Login } from './containers';  // delete when done w/ dev
import actions from '../actions';
import { withRouter } from 'react-router-dom';

class App extends Component {
    state = {
        isAuthenticated: false,
        isAuthenticating: true,
    };

   async componentDidMount() {
        // when user navigates to the app, this component will always need to mount, therefore
        // we want the component to check for a currentUser
        try {
            this.props.getCurrentSession()
            await this.props.getCurrentUser();
            console.log('App.componentDidMount()', this); // delete after dev
            console.log('App.componentDidMount.currentUser', this.props.currentUser); // delte after dev
            // if user is logged in, the Settings/Logout page should be rendered (not Signup/Login)
            if(this.props.currentUser.email !== 'No current user') {
                console.log('testing this.props.user.currentUser:::', this.props.currentUser);                
                this.userHasAuthenticated(true);
            }
            if(this.props.currentUser.email === 'No current user') {
                console.log('testing this.props.user.currentUser:::', this.props.currentUser);
                const anonymousUser = await this.props.callCurrentCredentials();
                console.log('testing this.props.user.currentUser:::', anonymousUser);
                // this.userHasAuthenticated(false);  // s/b false already
            }
        // error handler    
        } catch (error) {
            console.log('error:::', error);
        }
        // intial authentication process complete
        this.setState({isAuthenticating: false});
        // make call for newsfeed items
        this.props.getNews();
        console.log('App.componentDidMount()', this);
        // make call for user location
        this.props.getUserLocation();
    }

    componentDidUpdate(prevProps) {
        // if component updates
        if(prevProps.currentUser != this.props.currentUser) {
            console.log('componentDidUpdate.this', this);
            this.props.getNews();
        }
      }

    userHasAuthenticated = authenticated => {
        this.setState({
            isAuthenticated: authenticated
        });
    }

    handleLogout = async event => {
        await this.props.signOut()

        this.userHasAuthenticated(false);
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
    currentUser: currentUser,
    location: state.userLocation
  };
};

const dispatchToProps = dispatch => {
  return {
    test: (data) => dispatch(actions.actionTest(data)),
    getNews: (data) => dispatch(actions.actionGetNews(data)),
    getCurrentUser: () => dispatch(actions.actionGetCurrentUser()),
    signOut: () => dispatch(actions.actionSignOutUser()),
    getUserLocation: () => dispatch(actions.actionGetUserLocation()),
    callCurrentCredentials: () => dispatch(actions.actionsCallCurrentCredentials()), // auth to allow non-logged in users access to api calls
    getCurrentSession: () => dispatch(actions.actionsGetCurrentSession()),
  };
};

export default connect(stateToProps, dispatchToProps)(withRouter(App));
