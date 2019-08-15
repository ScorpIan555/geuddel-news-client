import constants from '../constants';

const initialState = {
  country: '',
  category: '',
  email: '',
  language: '',
  data: ''
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  const payload = action.data;

  switch (action.type) {
    case constants.GET_CURRENT_USER_DB_INFO:
      console.log('GET_CURRENT_USER_DB_INFO.payload::: ', payload);
      newState.country = payload.data.country;
      newState.language = payload.data.language;
      newState.category = payload.data.category;
      newState.email = payload.data.email;
      newState.data = payload.data;
      console.log('newState', newState);

      return newState;

    case constants.UPDATE_USER_DB_INFO:
      console.log('UPDATE_USER_DB_INFO:::', payload);
      newState.country = payload.country;
      newState.language = payload.language;
      newState.category = payload.category;
      newState.email = payload.email;
      newState.data = payload.data;
      console.log('newState', newState);

      return newState;

    case constants.GET_USER_LOCATION:
      console.log('GET_USER_LOCATION!::', payload);
      newState.userLocation = payload;
      console.log('newState.currentUser', newState);

      return newState;

    default:
      return newState;
  }
};
