import constants from '../constants';
import { HTTPClient, AwsAuthClient } from '../utils';

export default {
  actionGetNewsForAuthorizedUser: query => {
    console.log('actionGetNews!!::: ', query);
    return dispatch => {
      console.log('actionGetNews2!!::: ', query);
      return dispatch(
        HTTPClient.getAsync({
          type: constants.GET_NEWS_FOR_AUTHORIZED_USER,
          endpoint: '/auth/getNews',
          query: query
        })
      );
    };
  },

  actionGetNewsForUnauthorizedUser: query => {
    console.log('actionGetNews!!::: ', query);
    return dispatch => {
      console.log('actionGetNews2!!::: ', query);
      return dispatch(
        HTTPClient.getAsync({
          type: constants.GET_NEWS_FOR_UNAUTHORIZED_USER,
          endpoint: '/auth/getNews',
          query: query
        })
      );
    };
  },

  // actionGetNewsByTopic: query => { // delete if not needed
  //   console.log('actionGetNewsByTopic!!::: ', query);
  //   return dispatch => {
  //     console.log('actionGetNewsByTopic!!::: ', query);
  //     return dispatch(
  //       HTTPClient.getAsync({
  //         type: constants.GET_NEWS_BY_TOPIC,
  //         endpoint: '/getNews',
  //         query: query
  //     })
  //   )}
  // },

  actionCreateUser: user => {
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

  actionSignInUser: user => {
    // sending obj w/ username/password to AWS
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

  actionChangeUserPassword: changePasswordRequest => {
    // sending obj w/ username/password to AWS
    console.log('actionSigninUser.user', changePasswordRequest);
    return dispatch => {
      return dispatch(
        AwsAuthClient.postAsync({
          type: constants.CHANGE_USER_PASSWORD,
          changePasswordRequest
        })
      );
    };
  },

  actionUserForgotPassword: user => {
    // sending obj w/ username/password to AWS
    console.log('actionSigninUser.user', user);
    return dispatch => {
      return dispatch(
        AwsAuthClient.postAsync({
          type: constants.FORGOT_USER_PASSWORD,
          user
        })
      );
    };
  },

  actionSignOutUser: () => {
    console.log('actionSignoutUser::::');
    return dispatch => {
      return dispatch(
        AwsAuthClient.deleteAsync({
          type: constants.SIGN_OUT_USER
        })
      );
    };
  },

  actionGetCurrentUser: user => {
    return dispatch => {
      return dispatch(
        AwsAuthClient.getAsync({
          type: constants.GET_CURRENT_USER,
          user
        })
      );
    };
  },

  actionGetUserLocation: params => {
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
      console.log('actionsCallCurrentCredentials:::');
      return dispatch(
        AwsAuthClient.getAsync({
          type: constants.AUTH_ANONYMOUS_USER
        })
      );
    };
  },

  actionsGetCurrentSession: () => {
    return dispatch => {
      console.log('actionsGetCurrentSession:::');
      return dispatch(
        AwsAuthClient.getAsync({
          type: constants.GET_CURRENT_SESSION
        })
      );
    };
  },

  actionsPostNote: req => {
    return dispatch => {
      console.log('actionsPostNote', req);
      return dispatch(
        HTTPClient.postAsync({
          type: constants.POST_NOTE,
          endpoint: '/create',
          body: req
        })
      );
    };
  },

  actionGetCurrentUserDbInfo: req => {
    return dispatch => {
      console.log('actionsGetUserData', req);
      return dispatch(
        HTTPClient.getAsync({
          type: constants.GET_CURRENT_USER_DB_INFO,
          endpoint: '/user',
          data: req
        })
      );
    };
  },

  actionsPostUserDbData: req => {
    return dispatch => {
      console.log('actionsPostNote', req);
      return dispatch(
        HTTPClient.postAsync({
          type: constants.CREATE_USER_DB_INFO,
          endpoint: '/create',
          body: req
        })
      );
    };
  },

  actionsUpdateUserDbData: req => {
    return dispatch => {
      console.log('actionsPostNote', req);
      return dispatch(
        HTTPClient.postAsync({
          type: constants.UPDATE_USER_DB_INFO,
          endpoint: '/create',
          body: req
        })
      );
    };
  },

  actionsResendConfirmationCode: params => {
    return dispatch => {
      console.log('actionsResendConfirmationCode:::', req);
      return dispatch(
        AwsAuthClient.postAsync({
          type: constants.RESEND_CONFIRM_USER,
          params
        })
      );
    };
  }
};
