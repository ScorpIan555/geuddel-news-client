import constants from '../constants';

const initialState = [];

console.log('userLocation.initialState', initialState);

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  const payload = action.data;

  switch (action.type) {

    case constants.GET_USER_LOCATION:
      console.log('GET_USER_LOCATION!::', payload);
      newState.userLocation = payload;
      console.log('newState.currentUser', newState);

      return newState;

    default:
      return newState;
  }
};
