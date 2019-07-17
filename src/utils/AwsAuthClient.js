import { Auth } from 'aws-amplify';

const get = async pkg => {
  if (pkg.type === 'GET_CURRENT_USER') {
    try {
      const user = await Auth.currentSession()
        .then(data => console.log(data))
        .catch(err => console.log(err));
      console.log('currentUser from Auth:::', user);
      return user;
    } catch (err) {
      console.log('err::', err);
    }
  }
};

const post = async pkg => {
  if (pkg.type === 'CREATE_USER') {
    try {
      const user = await Auth.signUp(
        pkg.params[0].username,
        pkg.params[0].password
      );

      console.log('AwsAuth.util.post.CREATE_USER', user);

      return user;
    } catch (err) {
      console.log('err', err);
    }
  }

  if (pkg.type === 'SIGN_IN_USER') {
    try {
      const user = await Auth.signIn(
        pkg.params[0].username,
        pkg.params[0].password
      );

      console.log('AwsAuth.util.post.SIGN_IN_USER', user);

      return user;
    } catch (err) {
      console.log('err::', err);
    }
  }

  if (pkg.type === 'CONFIRM_USER') {
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
  let type = pkg['type'];

  if (type === 'USER_SIGNED_OUT') {
    await Auth.signOut({
      global: false
    });
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
          if (pkg.type != null) {
            dispatch({
              type: pkg.type,
              data: responseFromThunkFunction
            });
          }
          console.log('res', responseFromThunkFunction);
          return responseFromThunkFunction;
        })
        .catch(err => console.log(err));
  },

  deleteAsync: pkg => {
    return dispatch => {
      deleteReq(pkg)
        .then(responseFromThunkFunction => {
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
