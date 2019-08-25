import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Routes from './Routes';
import { Nav, Footer } from './presentation';
import { Sidebar } from './containers';
import actions from '../actions';
import { withRouter } from 'react-router-dom'; // inject react-router props into component above client routing hierarchy
import { css } from '@emotion/core';
import { PacmanLoader } from 'react-spinners';

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    isWorking: true,
    articles: []
  };

  async componentDidMount() {
    // console.log('process.env.REACT_APP_STAGE:::', process.env.REACT_APP_STAGE);
    // console.log('process.env:::', process.env);

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
    this.setState({
      isAuthenticating: false,
      isWorking: true
    });
    // make call for user location
    // @TODO need to build out user data, for instance, a logged in user should have a country/lang
    // await this.props.getUserLocation(); // moved this into initial auth function
    console.log('this.propsbefore initial news results called:::', this.props);
    // get news results
    this.state.isAuthenticated === true
      ? this.fetchNewsForAuthorizedUser()
      : this.fetchNewsForUnauthorizedUser();

    // this.handleNewsResultsAfterComponentMounts();

    // console.log('App.componentDidMount().articles', this.props.newsapiResponse);
  }

  fetchNewsForAuthorizedUser = async () => {
    console.log('fetchNewsForAuthorizedUser:::', this.props);
    try {
      // destructure and assign props for request
      let { country, category, language } = this.props;
      // request needs to be sent in a single object
      let newsRequestObject = {
        country,
        category,
        language
      };
      // make action request
      await this.props.getNewsForAuthorizedUser(newsRequestObject);
    } catch (error) {
      console.log('fetchNewsForAuthorizedUser'), error;
    }
    console.log('fetchNewsForAuthorizedUser.props:::', this.props);
    console.log('fetchNewsForAuthorizedUser.state:::', this.state);
    this.setState({
      isWorking: false,
      articles: this.props.newsapiResponse
    });
  };

  fetchNewsForUnauthorizedUser = async () => {
    console.log('fetchNewsForAuthorizedUser:::', this.props);
    try {
      // destructure and assign props for request
      let { userLocation } = this.props;
      // request needs to be sent in a single object
      let newsRequestObject = {
        userLocation
      };
      // make action request
      await this.props.getNewsForUnauthorizedUser(newsRequestObject);
    } catch (error) {
      console.log('fetchNewsForAuthorizedUser'), error;
    }
    console.log('fetchNewsForAuthorizedUser.props:::', this.props);
    console.log('fetchNewsForAuthorizedUser.state:::', this.state);
    this.setState({
      isWorking: false,
      articles: this.props.newsapiResponse
    });
  };

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

  userHasAuthenticated = authenticated => {
    this.setState({
      isAuthenticated: authenticated
    });
  };

  handleLogout = async event => {
    event.preventDefault();
    await this.props.signOut();

    this.userHasAuthenticated(false);
  };

  handleClick = async event => {
    event.preventDefault();
    //
    this.setState({
      isWorking: true
    });

    let pathArray = event.target.href.split('/');

    try {
      let query = {
        category: pathArray[4],
        userLocation: this.props.userLocation
      };
      this.state.isAuthenticated === true
        ? await this.props.getNewsForAuthorizedUser(query)
        : await this.props.getNewsForUnauthorizedUser(query);
    } catch (error) {
      console.log('error:::', error);
    }
    this.setState({
      isWorking: false
    });
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

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;

    return (
      <div className="container">
        <Nav props={childProps} />

        <div className="main-container">
          <section>
            <div className="container">
              <div className="row">
                <Sidebar props={sidebarChildProps} handleClick={handleClick} />

                {this.state.isWorking === true ||
                this.state.isAuthenticating === true ? (
                  <div className="sweet-loading">
                    <PacmanLoader
                      css={override}
                      sizeUnit={'px'}
                      size={100}
                      color={'gold'}
                      loading={this.state.isWorking}
                    />
                  </div>
                ) : (
                  <Routes childProps={childProps} />
                )}
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
  const { userLocation, data, language, category, country } = state.userData;
  const { newsapiResponse, articles } = state.newsfeed;

  return {
    sidebarTop: topLink,
    sidebarBottom: bottomLink,
    currentUser: currentUser,
    userLocation: userLocation,
    language: language,
    country: country,
    category: category,
    newsapiResponse: newsapiResponse,
    articles: articles
  };
};

const dispatchToProps = dispatch => {
  return {
    getNewsForAuthorizedUser: data =>
      dispatch(actions.actionGetNewsForAuthorizedUser(data)),
    getNewsForUnauthorizedUser: data =>
      dispatch(actions.actionGetNewsForUnauthorizedUser(data)),
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
