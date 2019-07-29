import { Auth } from 'aws-amplify';

const get = async req => {
  if (req.type === 'GET_CURRENT_USER') {
    try {
      // invoke async GET to AWS via Auth module
      const user = await Auth.currentAuthenticatedUser()
      // the authReducer returns a nested user object t/b passed 
      // console.log('GET_CURRENT_USER.res::', user);
      if(user.authenticated === true) {
        // console.log('currentUser from Auth:::', user);
        let currentUser = user.attributes.email;
        return currentUser;
      }
      if(user.authenticated === false) {
        // console.log('currentUser from Auth:::', user);
        let currentUser = {
          email: 'No current user'
        };
        return currentUser;
      }
    } catch (err) {
      // if no user is authenticated, will pass a 'not authenticated' error
      if(err === 'not authenticated') {
        const noCurrentUser = {
          email: 'No current user'
        };
        return noCurrentUser;
      }
    }
  }

  if(req.type == 'AUTH_ANONYMOUS_USER') {
    console.log('AUTH_ANONYMOUS_USER!:::', req);
    try {
      // invoke async GET to AWS via Auth module
      const user = await Auth.currentCredentials();
      // the authReducer returns a nested user object t/b passed 
       
      console.log('anon user from Auth:::', user);
      // let currentUser = user.attributes.email;  // from GET_CURRENT_USER
      let currentUser = user;  // from GET_CURRENT_USER
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

  if(req.type == 'GET_CURRENT_SESSION') {
    console.log('GET_CURRENT_SESSION!:::', req);
    try {
      // invoke async GET to AWS via Auth module
      const user = await Auth.currentSession();
      // the authReducer returns a nested user object t/b passed 
       
      console.log('current session from Auth:::', user);
      // let currentUser = user.attributes.email;  // from GET_CURRENT_USER
      let currentUser = user;  // from GET_CURRENT_USER
      return currentUser;
    } catch (err) {
      // if no user is authenticated, pass the error
      if(err === 'No current user') {
        // if no user is logged in, handle error with message
        return {
          message: 'No current user'
        };
      }
      if(err !== 'No current user') {
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
      console.log('err', err);
      alert(err.message);
      return;
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
      console.log('err::', err);
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
    })
  }
};

export default {
  getAsync: req => {
    return dispatch =>
      get(req)
      .then(responseFromThunkFunction => {
        console.log('responseFromThunkFunction:::', this, responseFromThunkFunction);
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
      })
  },

  postAsync: req => {
    return dispatch =>
      post(req)
        .then(responseFromThunkFunction => {
          console.log(
            'post.asyncResForDispatchToStore::::',
            responseFromThunkFunction
          );
          if(responseFromThunkFunction != undefined) {
            if (req.type != null) {
              console.log('check the conditional')
              dispatch({
                type: req.type,
                data: responseFromThunkFunction
              });
            }
          }
          console.log('res', responseFromThunkFunction);
          return responseFromThunkFunction;
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
