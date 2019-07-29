import constants from '../constants';

const initialState = [];

export default (state = initialState, action) => {
  let newState = Object.assign({}, state);
  const payload = action.data;

  switch (action.type) {
    case constants.GET_NEWS:
      console.log('GET_NEWS from reducer:::', payload);
      newState.newsapiResponse = payload;
      if(payload != undefined) {
        newState.articles = payload.articles;
      } else {
        newState = null;
      }

      console.log('GET NEWS newState:::', newState);
      
      return newState;

    case constants.GET_NEWS_BY_TOPIC:
      newState.newsapiResponse = payload;

      if(payload != undefined) {
        newState.articles = payload.articles;
      } else {
        newState = null;
      }
      
      return newState;

    default:
      return newState;
  }
};
