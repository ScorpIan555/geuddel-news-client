import constants from '../constants';

const initialState = [];

export default (state = initialState, action) => {
  let newState = Object.assign({}, state);
  const payload = action.data;

  switch (action.type) {
    case constants.TOP_HEADLINES_RECEIVED:
      newState.articles = payload;

      return newState;

    case constants.TEST:
      newState.test = payload;
      return newState;

    default:
      return newState;
  }
};
