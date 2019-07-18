import constants from '../constants';
import { HTTPClient, AwsAuthClient } from '../utils';

export default {
  actionTest: (...params) => {
    return {
      type: constants.TEST,
      data: params
    };
  },

  actionGetNews: body => {
    console.log('actionGetNews!!::: ', body);
    return dispatch => {
      console.log('actionGetNews2!!::: ', body);
      return dispatch(HTTPClient.asyncPost({
        type: constants.GET_NEWS, 
        endpoint: '/getNews',
        body: body
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
  }

};
