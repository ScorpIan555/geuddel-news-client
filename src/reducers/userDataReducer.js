import constants from '../constants';

const initialState = [];

export default (state = initialState, action) => {
    const newState = Object.assign({}, state);
    const payload = action.data;

    switch (action.type) { 
        case constants.GET_CURRENT_USER_DB_INFO:
            console.log('GET_CURRENT_USER_DB_INFO::: ', payload);
            newState.userData = payload;
            console.log('newState', newState);
            console.log('newState.userData', newState.userData);
        
            return newState;
        
        
        case constants.GET_USER_LOCATION:
            console.log('GET_USER_LOCATION!::', payload);
            newState.userLocation = payload;
            console.log('newState.currentUser', newState);
        
            return newState;


        default:
            return newState;

    }

}