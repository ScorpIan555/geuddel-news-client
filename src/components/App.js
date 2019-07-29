import React, { Component } from 'react';
import { connect } from 'react-redux';
import Routes from './Routes';
import { Nav, Footer } from './presentation';
import { Sidebar } from './containers';  // delete when done w/ dev
// import { Sidebar, Topic, Signup, Login } from './containers';  // delete when done w/ dev
import actions from '../actions';
import { withRouter } from 'react-router-dom';

class App extends Component {
    state = {
        isAuthenticated: false,
        isAuthenticating: true,
        articles: [],
        currentTopic: 'home',
        oldTopic: ''
    };

    handleInitialAuthentication = async () => {
        try {
            // async call backend Aws-Amplify Auth module 
            await this.props.getCurrentUser();
            // handle negative response from Auth call, create anonymous auth credentials to allow guest users to see results
            if(this.props.currentUser.email === 'No current user') {
                console.log('App.componentDidMount.No current user:::', this.props.currentUser);
                await this.props.callCurrentCredentials();
                // this.userHasAuthenticated(false);  // s/b false already
            }
            // handle positive response from Auth call
            if(this.props.currentUser.email !== 'No current user') {
                // if user is logged in, the Settings/Logout page should be rendered (not Signup/Login)
                console.log('App.componentDidMount.currentUser:::', this.props.currentUser);                
                this.userHasAuthenticated(true);
            }
            
        } catch (error) {
            console.log('error in handleInitialAuthentication function:::', error);
        }
    }

    fetchCurrentSession = () => {
        // synchronous call to backend apit/Aws-Amplify Auth module 
        this.props.getCurrentSession()
    }

   async componentDidMount() {
        // when user navigates to the app, this component will always need to mount, therefore
        // we want the component to check for a currentUser
        console.log('this.props.location:::', this.props.location.pathname);
        try {
            // fetch the current session data
            this.fetchCurrentSession();
            // check for and return a logged in user, or return anonymously auth'd credentials (for guest users)
            await this.handleInitialAuthentication();

            //   // async call backend Aws-Amplify Auth module 
            //   await this.props.getCurrentUser();
            //   // handle negative response from Auth call, create anonymous auth credentials to allow guest users to see results
            //   if(this.props.currentUser.email === 'No current user') {
            //       console.log('App.componentDidMount.No current user:::', this.props.currentUser);
            //       await this.props.callCurrentCredentials();
            //       // this.userHasAuthenticated(false);  // s/b false already
            //   }
            //   // handle positive response from Auth call
            //   if(this.props.currentUser.email !== 'No current user') {
            //       // if user is logged in, the Settings/Logout page should be rendered (not Signup/Login)
            //       console.log('App.componentDidMount.currentUser:::', this.props.currentUser);                
            //       this.userHasAuthenticated(true);
            //   }

        // error handler    
        } catch (error) {
            console.log('error:::', error);
        }
        // intial authentication process complete
        this.setState({ isAuthenticating: false });
        
        
        // make call for user location
        await this.props.getUserLocation();

        console.log('this.props.location after call:::', this.props.userLocation);
        if(this.props.newsapiResponse == undefined) {
            if(this.props.articles !== this.state.articles) {
                console.log('this.props.newsapiRespons was undefined', this.props.userLocation);
                await this.props.getNews(this.props.userLocation);
                this.setState({
                    articles: this.props.newsapiResponse,
                    oldTopic: 'home'
                })
            } 
        }
        if(this.props.newsapiResponse !== undefined) {
            console.log('DIDNT MAKE A CALL DUE TO CONDITIONAL!!!!', this.props.newsapiResponse);
            
        }

        console.log('App.componentDidMount().articles', this.props.newsapiResponse);
        
    }

    async shouldComponentUpdate(nextProps, nextState, snapshot) {
        // console.log('shouldComponentUpdate.this.props:::', this.props);
        // console.log('shouldComponentUpdate.nextProps.:::', nextProps);
        // console.log('shouldComponentUpdate.nextState:::', nextState);
        // console.log('shouldComponentUpdate.snapshot:::', snapshot);

        // if(this.props.location.pathname !== nextProps.location.pathname) {
        //     console.log('PASSED SHOULD COMPONENT UPDATE CONDITIONAL -- TRUE');
        //     return true;
        // }

        // if(this.props.location.pathname === nextProps.location.pathname) {
        //     console.log('PASSED SHOULD COMPONENT UPDATE CONDITIONAL -- FALSE');
        //     return false;
        // }

        // // if(this.props.location !== nextProps.location) {
        //     if(nextProps.location.pathname !== '/') {
        //         let pathArray = nextProps.location.pathname.split('/');
        //         console.log('pathArray:::', pathArray);
        //         console.log('pathArray:::', pathArray[2]);

        //         let oldTopic = this.state.oldTopic
        //         let newTopic = pathArray[2];

        //         this.setState({
        //             oldTopic: oldTopic,
        //             currentTopic: newTopic

        //         });

        //         if(oldTopic !== newTopic) {
        //             if(this.state.articles !== nextProps.articles) {
        //                 console.log('this.state.articles:::', this.state.articles);
        //                 console.log('this.state.articles:::', nextProps.articles);
        //                 console.log('this.state.articles:::', this.state.articles);
    
        //                 if(nextProps.location.pathname !== '/' ) {
        //                     let query = {
        //                         topic: this.state.topic
        //                     };
        //                 }
        //                 await this.props.getNews(query);
        //                 console.log('App.componentDidMount().articles', this.props.articles);
        //                 this.setState({
        //                     articles: this.props.articles,
        //                     oldTopic: this.state.currentTopic
        //                 });
        //             }
        //         }
                
                
            // }
            
        // }
        return true;
    }
    

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('prevProps:::', prevProps);
        // console.log('prevState:::', prevState);
        // console.log('snapshot:::', snapshot);

        // let pathArray = this.props.location.pathname.split('/');
        // console.log('pathArray:::', pathArray);
        // console.log('pathArray:::', pathArray[2]);

        // try {
        //     // let oldTopic = this.state.oldTopic
        //     let newTopic = {
        //         topic: pathArray[2]
        //     };

        //     // await this.props.actionGetNewsByTopic(newTopic);
        //     // console.log('')
        // } catch (error) {
        //     console.log('error:::', error);
        // }

        

        // if component updates
        // if(prevProps.currentUser != this.props.currentUser) {
        //     console.log('componentDidUpdate.this', this);
        //     this.props.getNews();
        // }
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
        event.preventDefault()
        console.log('Click');
        let data = {
            isItWorking: 'yes, it is working'
        };
        // console.log('Click', data);
    }
    
    render() {
        // desconstruct and assign class methods
        let { handleClick, userHasAuthenticated, handleLogout } = this;
        // deconstruct and assign state
        let { isAuthenticated } = this.state;
        // deconstruct and assign props
        let { sidebarTop, sidebarBottom, newsapiResponse } = this.props;
        // create childProps object to be passed into sidebar component
        const sidebarChildProps = {  // @TODO 
            sidebarTop,
            sidebarBottom,
            handleClick
        };

        let childProps = {
            isAuthenticated,
            userHasAuthenticated,
            handleLogout,
            newsapiResponse,
            sidebarTop,
            sidebarBottom,
        }

        return (
        <div className="container">

                        <Nav props={childProps} />
            
            <div className="main-container">
                <section>
                    <div className="container">
                        <div className="row">

                        <Sidebar props={sidebarChildProps} />
                
                        <Routes childProps={childProps} />
                
                        </div>
                    </div>
                </section>

                        <Footer />

            </div>
        </div>
        );
    }
}

const stateToProps = state => {
  const { topLink, bottomLink } = state.sidebar;
  const { currentUser } = state.auth;
  const userLocation = state.userLocation;
  const { newsapiResponse, articles } = state.newsfeed;

  return {
    sidebarTop: topLink,
    sidebarBottom: bottomLink,
    currentUser: currentUser,
    userLocation: userLocation,
    newsapiResponse: newsapiResponse,
    articles: articles
  };
};

const dispatchToProps = dispatch => {
  return {
    getNews: (data) => dispatch(actions.actionGetNews(data)),
    actionGetNewsByTopic: (data) => dispatch(actions.actionGetNewsByTopic(data)),
    getCurrentUser: () => dispatch(actions.actionGetCurrentUser()),
    signOut: () => dispatch(actions.actionSignOutUser()),
    getUserLocation: () => dispatch(actions.actionGetUserLocation()),
    callCurrentCredentials: () => dispatch(actions.actionsCallCurrentCredentials()), // auth to allow non-logged in users access to api calls
    getCurrentSession: () => dispatch(actions.actionsGetCurrentSession())
  };
};

export default connect(stateToProps, dispatchToProps)(withRouter(App));
