import constants from '../constants';

const initialState = [];

export default (state = initialState, action) => {
  let newState = Object.assign({}, state);
  const payload = action.data;

  switch (action.type) {
    case constants.GET_NEWS:
      console.log('GET_NEWS from reducer:::', payload)
      newState.articles = payload;

      return newState;

    case constants.TEST:
      newState.test = payload;
      return newState;

    default:
      return newState;
  }
};
