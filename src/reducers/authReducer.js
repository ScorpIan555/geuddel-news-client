import constants from '../constants';

const initialState = [];

console.log('userReducer.initialState', initialState);

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  const payload = action.data;

  switch (action.type) {
    case constants.TEST_REDUX:
      newState.test = payload;
      console.log('TEST SUCCESS!', newState);

      return newState;

    case constants.CREATE_USER:
      console.log('USER_CREATED!::', payload);
      newState.currentUser = payload;

      return newState;

    case constants.SIGN_IN_USER:
      console.log('USER_SIGNED_IN!::', payload);
      newState.currentUser = payload;

      return newState;

    case constants.SIGN_OUT_USER:
      console.log('USER_SIGNED_OUT');
      newState.currentUser = [];

      return newState;

    case constants.GET_CURRENT_USER:
      console.log('GET_CURRENT_USER!:::', payload);
      newState.currentUser = payload;

      return newState;

    default:
      return newState;
  }
};
