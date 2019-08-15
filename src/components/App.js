import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Routes from './Routes';
import { Nav, Footer } from './presentation';
import { Sidebar } from './containers'; // delete when done w/ dev
// import { Sidebar, Topic, Signup, Login } from './containers';  // delete when done w/ dev
import actions from '../actions';
import { withRouter } from 'react-router-dom';

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    articles: []

    // currentTopic: 'home',
    // oldTopic: ''
  };

  async componentDidMount() {
    // when user navigates to the app, this component will always need to mount, therefore
    // we want the component to check for a currentUser
    try {
      // @TODO, might wanna add checks to see if data already exists to save performance

      // fetch the current session data
      this.fetchCurrentSession();
      // check for and return a logged in user, or return anonymously auth'd credentials (for guest users)
      await this.handleInitialAuthentication();
      // error handler
    } catch (error) {
      console.log('error:::', error);
    }
    // intial authentication process complete
    this.setState({ isAuthenticating: false });
    // make call for user location
    // @TODO need to build out user data, for instance, a logged in user should have a country/lang
    // await this.props.getUserLocation(); // moved this into initial auth function
    console.log('this.propsbefore initial news results called:::', this.props);
    // get news results
    this.handleNewsResultsAfterComponentMounts();

    // console.log('App.componentDidMount().articles', this.props.newsapiResponse);
  }

  handleInitialAuthentication = async () => {
    try {
      // async call backend Aws-Amplify Auth module
      await this.props.getUserLocation();
      const user = await this.props.getCurrentUser();
      console.log('currentUser object from Auth:::', user);
      // handle negative response from Auth call, create anonymous auth credentials to allow guest users to see results
      if (this.props.currentUser.email === 'No current user') {
        console.log(
          'App.componentDidMount.No current user:::',
          this.props.currentUser
        );
        await this.props.callCurrentCredentials();
        // this.userHasAuthenticated(false);  // s/b false already
      }
      // handle positive response from Auth call
      if (this.props.currentUser.email !== 'No current user') {
        // if user is logged in, the Settings/Logout page should be rendered (not Signup/Login)
        console.log(
          'App.componentDidMount.currentUser:::',
          this.props.currentUser
        );
        let currentUser = this.props.currentUser;
        if (this.props.currentUser !== undefined || null) {
          await this.fetchCurrentUserData(currentUser);
        }
        this.userHasAuthenticated(true);
        console.log('ending.handleInitialAuthentication::::', this.props);
      }
    } catch (error) {
      console.log('error in handleInitialAuthentication function:::', error);
    }
  };

  fetchCurrentSession = () => {
    // synchronous call to backend apit/Aws-Amplify Auth module
    this.props.getCurrentSession();
  };

  fetchCurrentUserData = async user => {
    console.log('fetchCurrentUserData.props:::', this.props);
    console.log('fetchCurrentUserData.user:::', user);
    await this.props.getCurrentUserDbInfo(this.props.currentUser);
  };

  handleNewsResultsAfterComponentMounts = async () => {
    console.log(
      'handleNewsResultsAfterComponentMounts.this.props :::',
      this.props
    );
    console.log(
      'handleNewsResultsAfterComponentMounts.userLocation:::',
      this.props.userLocation
    );
    if (this.props.newsapiResponse == undefined) {
      if (this.props.articles !== this.state.articles) {
        console.log(
          'handleNewsResultsAfterComponentMounts.this.props :::',
          this.props
        );
        console.log(
          'this.props.newsapiRespons was undefined::::',
          this.props.userLocation
        );
        console.log(
          'this.props.newsapiRespons was undefined::::',
          this.props.userData
        );
        let { userData, userLocation } = this.props;
        // let userLocation = this.props.userLocation

        let countryCode =
          userData.country !== undefined || null
            ? userData.country
            : userLocation;
        // let category = (userData !== undefined || null ) ? userData

        let category, country, language;

        if (userData !== undefined || null) {
          category = userData.category;
          country = userData.country;
          language = userData.language;
        }

        let newsRequestObject = {
          country: country !== undefined || null ? country : countryCode,
          category: category,
          language: language
        };

        await this.props.getNews(newsRequestObject);
        // await this.props.getNews(userLocation);
        this.setState({
          articles: this.props.newsapiResponse
        });
      }
    }
    if (this.props.newsapiResponse !== undefined) {
      console.log(
        'DIDNT MAKE A CALL DUE TO CONDITIONAL!!!!',
        this.props.newsapiResponse
      );
    }
  };

  async shouldComponentUpdate(nextProps, nextState, snapshot) {
    // console.log('shouldComponentUpdate.this.props:::', this.props);
    // console.log('shouldComponentUpdate.nextProps.:::', nextProps);
    // console.log('shouldComponentUpdate.nextState:::', nextState);
    // console.log('shouldComponentUpdate.snapshot:::', snapshot);

    return true;
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('prevProps:::', prevProps);
    // console.log('prevState:::', prevState);
    // console.log('snapshot:::', snapshot);
    console.log('componentDidUpdate::::', this.props.userData);
  }

  userHasAuthenticated = authenticated => {
    this.setState({
      isAuthenticated: authenticated
    });
  };

  handleLogout = async event => {
    await this.props.signOut();

    this.userHasAuthenticated(false);
  };

  handleClick = async event => {
    event.preventDefault();
    console.log('Click', event.target);
    console.log('Click.this.props', this);

    let pathArray = event.target.href.split('/');
    console.log('pathArray:::', pathArray);
    console.log('pathArray:::', pathArray[4]);

    try {
      if (this.props.userData.language !== undefined || null) {
        let query = {
          topic: pathArray[4],
          // userLocation: this.props.userLocation
          language: this.props.userData.language
        };
        console.log('Click.this.props', this.props);
        console.log('Click.this.props', query);
        let topicResults = await this.props.getNews(query);
        console.log('topicResults', topicResults);
      } else {
        let query = {
          topic: pathArray[4],
          userLocation: this.props.userLocation
        };
        console.log('Click.this.props', this.props);
        console.log('Click.this.props', query);
        let topicResults = await this.props.getNews(query);
        console.log('topicResults', topicResults);
      }

      console.log('Click.this.props', this.props);
      console.log('Click.this.props', query);
      let topicResults = await this.props.getNews(query);
      console.log('topicResults', topicResults);
    } catch (error) {
      console.log('error:::', error);
    }
  };

  render() {
    // desconstruct and assign class methods
    let { handleClick, userHasAuthenticated, handleLogout } = this;
    // deconstruct and assign state
    let { isAuthenticated } = this.state;
    // deconstruct and assign props
    let { sidebarTop, sidebarBottom, newsapiResponse } = this.props;
    // create childProps object to be passed into sidebar component
    const sidebarChildProps = {
      // @TODO
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
      sidebarBottom
    };

    return (
      <div className="container">
        <Nav props={childProps} />

        <div className="main-container">
          <section>
            <div className="container">
              <div className="row">
                <Sidebar props={sidebarChildProps} handleClick={handleClick} />

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
  const { userLocation, data } = state.userData;
  const { newsapiResponse, articles } = state.newsfeed;

  return {
    sidebarTop: topLink,
    sidebarBottom: bottomLink,
    currentUser: currentUser,
    userLocation: userLocation,
    userData: data,
    newsapiResponse: newsapiResponse,
    articles: articles
  };
};

const dispatchToProps = dispatch => {
  return {
    getNews: data => dispatch(actions.actionGetNews(data)),
    // getNewsByTopic: (data) => dispatch(actions.actionGetNewsByTopic(data)), delete if not needed
    getCurrentUser: () => dispatch(actions.actionGetCurrentUser()),
    signOut: () => dispatch(actions.actionSignOutUser()),
    getUserLocation: () => dispatch(actions.actionGetUserLocation()),
    callCurrentCredentials: () =>
      dispatch(actions.actionsCallCurrentCredentials()), // auth to allow non-logged in users access to api calls
    getCurrentSession: () => dispatch(actions.actionsGetCurrentSession()),
    actionsPostNote: body => dispatch(actions.actionsPostNote(body)),
    getCurrentUserDbInfo: currentUser =>
      dispatch(actions.actionGetCurrentUserDbInfo(currentUser))
  };
};

export default hot(
  connect(
    stateToProps,
    dispatchToProps
  )(withRouter(App))
);
