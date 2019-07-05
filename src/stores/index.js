import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { newsfeedReducer } from '../reducers';

let store = [];
export const history = createBrowserHistory();

export default {
  configure: initialState => {
    const reducers = combineReducers({
      newsfeed: newsfeedReducer
    });

    if (initialState) {
      store = createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(thunk))
      );
      return store;
    }

    store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
    return store;
  },

  currentStore: () => {
    return store;
  }
};
