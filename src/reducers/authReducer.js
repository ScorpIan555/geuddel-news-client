import constants from '../constants';

const initialState = [];

console.log('userReducer.initialState', initialState);

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  const payload = action.data;

  switch (action.type) {

    case constants.CREATE_USER:  // @TODO fix this
      // console.log('USER_CREATED!::', payload);
      newState.currentUser = payload.user.username;
      newState.userWhoWasJustCreated = {
        user: payload.user,
        username: payload.user.username,
        userConfirmed: payload.userConfirmed,
        userSub: payload.userSub

      };
      console.log('newState.currentUser', newState.currentUser);

      return newState;

    case constants.SIGN_IN_USER:
        console.log('USER_SIGNED_IN!:::', payload);
        if(payload.message === 'Incorrect username or password.') {
          newState.signInError = payload;
          newState.currentUser = { 
            email: 'No current user' 
          };
          return newState;
        }
        if(payload.message === 'An account with that given email already exists.') {
          newState.signInError = payload;
          newState.currentUser = { 
            email: 'Account already exists' 
          };
          return newState;
        }

      newState.currentUser = payload;

      console.log('USER_SIGNED_IN!:::', newState.currentUser);

      return newState;


    case constants.GET_CURRENT_USER:
        console.log('GET_CURRENT_USER!:::', payload);
        newState.currentUser = payload;
  
        console.log('GET_CURRENT_USER!:::', newState.currentUser);
  
        return newState;
        

      case constants.INCORRECT_PASSWORD:
          console.log('USER_SIGNED_IN!:::', payload);
          if(payload.message === 'Incorrect username or password.') {
            newState.signInError = payload;
            newState.currentUser = { 
              email: 'No current user' 
            };
            return newState;
          }
  
        newState.currentUser = payload;
  
        console.log('USER_SIGNED_IN!:::', newState.currentUser);
        console.log('USER_SIGNED_IN!:::', newState);
  
        return newState;

    case constants.SIGN_OUT_USER:  // @TODO fix this
      // console.log('USER_SIGNED_OUT', payload);
      
      // const noCurrentUser = {  // needs to be repaced with actual newState.etc.etc
      //   email: 'No current user'
      // };
      newState.currentUser = payload;

      console.log('USER_SIGNED_OUT', newState);
      
      return newState;


    case constants.AUTH_ANONYMOUS_USER:
      // store results for guest user session, not current user b/c that overrides other functionality
      newState.anonymousUser = payload;
      console.log('AUTH_ANONYMOUS_USER:::', newState);

      return newState;

    case constants.GET_CURRENT_SESSION:
      
      newState.currentSession = payload;
      console.log('GET_CURRENT_SESSION:::', newState);

      return newState;

    case constants.GET_CURRENT_USER_DB_INFO:


    default:
      return newState;
  }
};
