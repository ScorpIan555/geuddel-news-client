import constants from '../constants';

const initialState = [];

console.log('userReducer.initialState', initialState);

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  const payload = action.data;

  switch (action.type) {

    case constants.CREATE_USER:
      console.log('USER_CREATED!::', payload);
      newState.currentUser = payload.user.email;
      console.log('newState.currentUser', newState.currentUser);

      return newState;

    case constants.SIGN_IN_USER:
      console.log('USER_SIGNED_IN!::', payload);
      newState.currentUser = payload;

      console.log('USER_SIGNED_IN!:::', newState.currentUser);

      return newState;

    case constants.SIGN_OUT_USER:
      console.log('USER_SIGNED_OUT');
      const noCurrentUser = {
        email: 'No current user'
      };
      
      return noCurrentUser

    case constants.GET_CURRENT_USER:
      console.log('GET_CURRENT_USER!:::', payload);
      newState.currentUser = payload;

      console.log('GET_CURRENT_USER!:::', newState.currentUser);

      return newState;

    default:
      return newState;
  }
};
