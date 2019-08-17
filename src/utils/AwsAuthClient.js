import { Auth } from 'aws-amplify';

// const handleError = err => {

// }

const get = async req => {
  if (req.type === 'GET_CURRENT_USER') {
    try {
      // invoke async GET to AWS via Auth module
      const user = await Auth.currentAuthenticatedUser();
      // the authReducer returns a nested user object t/b passed
      console.log('GET_CURRENT_USER.res::', user);
      if (user.authenticationFlowType === 'USER_SRP_AUTH') {
        console.log('currentUser from Auth:::', user);
        let currentUser = user.attributes.email;

        return currentUser;
      }
      if (user.authenticated === false) {
        // console.log('currentUser from Auth:::', user);
        let currentUser = {
          email: 'No current user'
        };
        return currentUser;
      }
    } catch (err) {
      // if no user is authenticated, will pass a 'not authenticated' error
      if (err === 'not authenticated') {
        const noCurrentUser = {
          email: 'No current user'
        };
        return noCurrentUser;
      }
    }
  }

  if (req.type == 'AUTH_ANONYMOUS_USER') {
    console.log('AUTH_ANONYMOUS_USER!:::', req);
    try {
      // invoke async GET to AWS via Auth module
      const user = await Auth.currentCredentials();
      // the authReducer returns a nested user object t/b passed

      console.log('anon user from Auth:::', user);
      // let currentUser = user.attributes.email;  // from GET_CURRENT_USER
      let currentUser = user; // from GET_CURRENT_USER
      return currentUser;
    } catch (err) {
      // if no user is authenticated, will pass a 'not authenticated' error
      console.log('err::', err);
      // if(err === 'not authenticated') {
      //   const noCurrentUser = {
      //     email: 'No current user'
      //   };

      //   return noCurrentUser;
      // }
    }
  }

  if (req.type == 'GET_CURRENT_SESSION') {
    console.log('GET_CURRENT_SESSION!:::', req);
    try {
      // invoke async GET to AWS via Auth module
      const user = await Auth.currentSession();
      // the authReducer returns a nested user object t/b passed

      console.log('current session from Auth:::', user);
      // let currentUser = user.attributes.email;  // from GET_CURRENT_USER
      let currentUser = user; // from GET_CURRENT_USER
      return currentUser;
    } catch (err) {
      // if no user is authenticated, pass the error
      if (err === 'No current user') {
        // if no user is logged in, handle error with message
        return {
          message: 'No current user'
        };
      }
      if (err !== 'No current user') {
        console.log('AwsAuthClient unexpected error', err);
        alert('unexpected error' + err);
      }
    }
  }
};

const post = async req => {
  if (req.type === 'CREATE_USER') {
    console.log('req.SIGN_UP:::', req);
    let { username, password } = req.user;
    try {
      const user = await Auth.signUp(username, password);

      console.log('AwsAuth.util.post.CREATE_USER', user);
      return user;
    } catch (err) {
      err['httpResponse'] = 'Error';
      console.log('err', err);
      alert(err.message);
      return err;
    }
  }

  if (req.type === 'SIGN_IN_USER') {
    console.log('req.SIGN_IN:::', req);
    let { username, password } = req.user;
    try {
      const user = await Auth.signIn(username, password);

      console.log('AwsAuth.util.post.SIGN_IN_USER', user);

      return user;
    } catch (err) {
      //  return handleError;
      err['httpResponse'] = 'Error';
      console.log('err', err);
      alert(err.message);
      return err;
    }
  }

  if (req.type === 'CONFIRM_USER') {
    console.log('CONFIRM_USER:::', req);
    try {
      const user = await Auth.confirmSignUp(
        req.params[0].username,
        req.params[0].confirmationCode
      );

      console.log('AwsAuth.util.post.CONFIRM_USER:::', user);

      return user;
    } catch (err) {
      err['httpResponse'] = 'Error';
      console.log('err', err);
      alert(err.message);
    }
  }

  if (req.type === 'RESEND_CONFIRM_USER') {
    console.log('CONFIRM_USER:::', req);
    try {
      const user = await Auth.resendSignUp(
        req.params[0].username,
        req.params[0].confirmationCode
      );

      console.log('AwsAuth.util.post.CONFIRM_USER:::', user);

      user['httpResponse'] = 'Success';

      return user;
    } catch (err) {
      err['httpResponse'] = 'Error';
      console.log('err', err);
      alert(err.message);
    }
  }

  if (req.type === 'CHANGE_USER_PASSWORD') {
    try {
      console.log('CONFIRM_USER:::', req);
      let { oldPassword, confirmPassword } = req.changePasswordRequest;
      console.log('CONFIRM_USER:::', req.changePasswordRequest);
      console.log('CONFIRM_USER:::', req.changePasswordRequest.oldPassword);
      console.log('CONFIRM_USER:::', oldPassword, confirmPassword);
      const res = Auth.currentAuthenticatedUser()
        .then((user, oldPassword, confirmPassword) => {
          console.log('currentAuthenticatedUser:::', user);
          console.log('currentAuthenticatedUser.req:::', req);
          console.log(
            'currentAuthenticatedUser:::',
            oldPassword,
            confirmPassword
          );
          return Auth.changePassword(
            user,
            req.changePasswordRequest.oldPassword,
            req.changePasswordRequest.confirmPassword
          );
        })
        .then(data =>
          console.log(data => {
            if (data === 'SUCCESS') {
              let response = {
                message: 'Successfully changed password'
              };
              return response;
            }
          })
        )
        .catch(err => {
          err['httpResponse'] = 'Error';
          console.log('err', err);
          alert(err.message);
        });

      console.log('AwsAuth.util.post.CONFIRM_USER:::', res);

      return res;
    } catch (err) {
      err['httpResponse'] = 'Error';
      console.log('err', err);
      alert(err.message);
    }
  }

  if (req.type === 'FORGOT_USER_PASSWORD') {
    console.log('CONFIRM_USER:::', req);
    try {
      Auth.forgotPassword(username)
        .then(data => console.log(data))
        .catch(err => console.log(err));

      // Collect confirmation code and new password, then
      Auth.forgotPasswordSubmit(username, code, new_password)
        .then(data => console.log(data))
        .catch(err => console.log(err));

      console.log('AwsAuth.util.post.CONFIRM_USER:::', user);

      return user;
    } catch (err) {
      console.log('err', err);
    }
  }
};

const deleteReq = async req => {
  console.log('deleteReq:::', req);

  if (req.type === 'SIGN_OUT_USER') {
    await Auth.signOut({ global: false })
      .then(res => {
        const noCurrentUser = {
          email: 'No current user'
        };
        return noCurrentUser;
      })
      .catch(err => {
        console.log('err::', err);
      });
  }
};

export default {
  getAsync: req => {
    return dispatch =>
      get(req)
        .then(responseFromThunkFunction => {
          console.log(
            'responseFromThunkFunction:::',
            responseFromThunkFunction
          );
          if (req.type != null) {
            dispatch({
              type: req.type,
              data: responseFromThunkFunction
            });
          }
        })
        .catch(err => {
          console.log('error from Thunk function::::', err);
          return;
        });
  },

  postAsync: req => {
    return dispatch =>
      post(req)
        .then(response => {
          console.log('post.asyncRes::::', response);
          // response must be handled
          if (response != undefined) {
            // redux actions must have a valid type
            if (req.type != null) {
              // handle response for successfully changed password
              if (response.message === 'Successfully changed password') {
                alert(response.message);
                console.log('successfully changed pw?:::', response);
                return dispatch({
                  type: req.type,
                  data: response
                });
              }
              // handle incorrect username/password
              if (response.message === 'Incorrect username or password.') {
                alert(response.message);
                console.log('Incorrect username or password', response);
                return dispatch({
                  type: 'INCORRECT_PASSWORD',
                  data: response
                });
              }
              // handle user attempting to sign up with email address that already exists
              if (
                response.message ===
                'An account with that given email already exists.'
              ) {
                alert(response.message);
                console.log(
                  'An account with that given email already exists',
                  response
                );
                return dispatch({
                  type: 'ACCOUNT_ALREADY_EXISTS',
                  data: response
                });
              }
              if (response.httpResponse == 'Error') {
                console.log('return error:::', response);
                return response;
              }
              // passed error checks
              console.log('all the way at the end!:::', req);
              console.log('all the way at the end!:::', response);
              return dispatch({
                type: req.type,
                data: response
              });
            }
            // console.log('res', response);
            // return response;
          }
        })
        .catch(err => console.log('err', err));
  },

  deleteAsync: req => {
    return dispatch => {
      deleteReq(req)
        .then(responseFromThunkFunction => {
          const noCurrentUser = {
            email: 'No current user'
          };
          if (req.type != null) {
            dispatch({
              type: req.type,
              data: noCurrentUser
            });
          }
          return;
        })
        .catch(err => console.log('err:::::', err));
    };
  }
};
