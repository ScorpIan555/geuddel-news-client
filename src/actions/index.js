import constants from '../constants';
import { HTTPClient, AwsAuthClient } from '../utils';

export default {
  actionTest: (...params) => {
    return {
      type: constants.TEST,
      data: params
    };
  },

  actionGetNews: query => {
    console.log('actionGetNews!!::: ', query);
    return dispatch => {
      console.log('actionGetNews2!!::: ', query);
      return dispatch(
        HTTPClient.getAsync({
          type: constants.GET_NEWS, 
          endpoint: '/getNews',
          query: query
      })
    )}
  },

  actionGetNewsByTopic: query => {
    console.log('actionGetNewsByTopic!!::: ', query);
    return dispatch => {
      console.log('actionGetNewsByTopic!!::: ', query);
      return dispatch(
        HTTPClient.getAsync({
          type: constants.GET_NEWS_BY_TOPIC, 
          endpoint: '/getNews',
          query: query
      })
    )}
  },

  actionCreateUser: (user) => {
    console.log('actionSigninUser.user', user);
    return dispatch => {
      return dispatch(
        AwsAuthClient.postAsync({
          type: constants.CREATE_USER,
          user
        })
      );
    };
  },

  actionConfirmUser: (...params) => {
    return dispatch => {
      return dispatch(
        AwsAuthClient.postAsync({
          type: constants.CONFIRM_USER,
          params
        })
      );
    };
  },

  actionSignInUser: (user) => { // sending obj w/ username/password to AWS
    console.log('actionSigninUser.user', user);
    return dispatch => {
      return dispatch(
        AwsAuthClient.postAsync({
          type: constants.SIGN_IN_USER,
          user
        })
      );
    };
  },

  actionSignOutUser: () => {
    console.log('actionSignoutUser::::' )
    return dispatch => {
      return dispatch(
        AwsAuthClient.deleteAsync({
          type: constants.SIGN_OUT_USER
        })
      );
    };
  },

  actionGetCurrentUser: () => {
    return dispatch => {
      return dispatch(
        AwsAuthClient.getAsync({
          type: constants.GET_CURRENT_USER
        })
      );
    };
  },

  actionGetUserLocation: (params) => {
    return dispatch => {
      console.log('actionGetLocation!!::: ');
      return dispatch(
        HTTPClient.getAsync({
          type: constants.GET_USER_LOCATION,
          query: params
        })
      );
    };
  },

  actionsCallCurrentCredentials: () => {
    return dispatch => {
      console.log('actionsCallCurrentCredentials:::')
      return dispatch(
        AwsAuthClient.getAsync({
          type: constants.AUTH_ANONYMOUS_USER
        })
      );
    };
  },

  actionsGetCurrentSession: () => {
    return dispatch => {
      console.log('actionsGetCurrentSession:::')
      return dispatch(
        AwsAuthClient.getAsync({
          type: constants.GET_CURRENT_SESSION
        })
      );
    };
  }

};
