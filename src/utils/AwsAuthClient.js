import { Auth } from 'aws-amplify';

const get = async pkg => {
  if (pkg.type === 'GET_CURRENT_USER') {
    try {
      // invoke async GET to AWS via Auth module
      const user = await Auth.currentAuthenticatedUser()
      // the authReducer returns a nested user object t/b passed 
       
      console.log('currentUser from Auth:::', user);
      let currentUser = user.attributes.email;
      return currentUser;
    } catch (err) {
      // if no user is authenticated, will pass a 'not authenticated' error
      console.log('err::', err);
      if(err === 'not authenticated') {
        const noCurrentUser = {
          email: 'No current user'
        };
        
        return noCurrentUser;
      }
    }
  }
};

const post = async pkg => {
  if (pkg.type === 'CREATE_USER') {
    console.log('pkg.SIGN_UP:::', pkg);
    let { username, password } = pkg.user;
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

  if (pkg.type === 'SIGN_IN_USER') {

    console.log('pkg.SIGN_IN:::', pkg);
    let { username, password } = pkg.user;
    try {
      const user = await Auth.signIn(username, password);

      console.log('AwsAuth.util.post.SIGN_IN_USER', user);

      return user;
    } catch (err) {
      console.log('err::', err);
    }
  }

  if (pkg.type === 'CONFIRM_USER') {
    console.log('CONFIRM_USER:::', pkg);
    try {
      const user = await Auth.confirmSignUp(
        pkg.params[0].username,
        pkg.params[0].confirmationCode
      );

      console.log('AwsAuth.util.post.CONFIRM_USER:::', user);

      return user;
    } catch (err) {
      console.log('err', err);
    }
  }
};

const deleteReq = async pkg => {
  console.log('deleteReq:::', pkg);

  if (pkg.type === 'SIGN_OUT_USER') {
    await Auth.signOut({ global: false })
    .then(res => console.log('res::::', res))
    .catch(err => console.log('err::', err))
  }
};

export default {
  getAsync: pkg => {
    return dispatch =>
      get(pkg).then(responseFromThunkFunction => {
        console.log('responseFromThunkFunction:::', responseFromThunkFunction);
        if (pkg.type != null) {
          dispatch({
            type: pkg.type,
            data: responseFromThunkFunction
          });
        }
      });
  },

  postAsync: pkg => {
    return dispatch =>
      post(pkg)
        .then(responseFromThunkFunction => {
          console.log(
            'post.asyncResForDispatchToStore::::',
            responseFromThunkFunction
          );
          if(responseFromThunkFunction != undefined) {
            if (pkg.type != null) {
              console.log('check the conditional')
              dispatch({
                type: pkg.type,
                data: responseFromThunkFunction
              });
            }
          }
          console.log('res', responseFromThunkFunction);
          return responseFromThunkFunction;
        })
        .catch(err => console.log('err', err));
  },

  deleteAsync: pkg => {
    return dispatch => {
      deleteReq(pkg)
        .then(responseFromThunkFunction => {
          console.log('deleteAsync', responseFromThunkFunction);
          if (pkg.type != null) {
            dispatch({
              type: pkg.type,
              data: responseFromThunkFunction
            });
          }
          return;
        })
        .catch(err => console.log('err:::::', err));
    };
  }
};
