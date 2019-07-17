import React, { Component } from 'react';
import { connect } from 'react-redux';
import Routes from './Routes';
import { Nav, Footer } from './presentation';
// import { Sidebar, Topic, Signup, Login } from './containers';
import actions from '../actions';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router-dom';
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

        this.props.getNews();


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
        let { handleClick, userHasAuthenticated } = this;
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
            isAuthenticated: isAuthenticated,
            userHasAuthenticated: userHasAuthenticated
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

  return {
    sidebarTop: topLink,
    sidebarBottom: bottomLink
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
