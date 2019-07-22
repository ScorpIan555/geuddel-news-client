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

      console.log('USER_SIGNED_OUT', noCurrentUser);
      
      return noCurrentUser;

    case constants.GET_CURRENT_USER:
      console.log('GET_CURRENT_USER!:::', payload);
      newState.currentUser = payload;

      console.log('GET_CURRENT_USER!:::', newState.currentUser);

      return newState;

    default:
      return newState;
  }
};
