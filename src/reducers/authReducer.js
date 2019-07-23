import constants from '../constants';

const initialState = [];

console.log('userReducer.initialState', initialState);

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  const payload = action.data;

  switch (action.type) {

    case constants.CREATE_USER:  // @TODO fix this
      console.log('USER_CREATED!::', payload);
      newState.currentUser = payload.user.email;
      console.log('newState.currentUser', newState.currentUser);

      return newState;

    case constants.SIGN_IN_USER:
      newState.currentUser = payload;

      console.log('USER_SIGNED_IN!:::', newState.currentUser);

      return newState;

    case constants.SIGN_OUT_USER:  // @TODO fix this
      
      const noCurrentUser = {  // needs to be repaced with actual newState.etc.etc
        email: 'No current user'
      };
      newState.currentUser = noCurrentUser;

      console.log('USER_SIGNED_OUT', noCurrentUser);
      
      return newState;

    case constants.GET_CURRENT_USER:
      console.log('GET_CURRENT_USER!:::', payload);
      newState.currentUser = payload;

      console.log('GET_CURRENT_USER!:::', newState.currentUser);

      return newState;

    case constants.AUTH_ANONYMOUS_USER:
      
      newState.currentUser = payload; // check and see if this works
      newState.anonymousUser = payload;
      console.log('AUTH_ANONYMOUS_USER:::', newState);

      return newState;

    case constants.GET_CURRENT_SESSION:
      
      newState.currentSession = payload;
      console.log('GET_CURRENT_SESSION:::', newState);

      return newState;

    default:
      return newState;
  }
};
