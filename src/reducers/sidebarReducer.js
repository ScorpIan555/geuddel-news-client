// import constants from '../constants';

const initialState = {
  topLink: [
    { nameString: 'Top Headlines', pathString: 'top-headlines' },
    { nameString: 'For You', pathString: 'for-you' },
    { nameString: 'Favorites', pathString: 'favorites' },
    { nameString: 'Saved Searches', pathString: 'saved-searches' }
  ],
  bottomLink: [
    { name: 'US', icon: 'flag' },
    { name: 'Business', icon: 'domain' },
    { name: 'Technology', icon: 'memory' },
    { name: 'Entertainment', icon: 'theaters' },
    { name: 'Sports', icon: 'directions_bike' },
    { name: 'Science', icon: 'school' },
    { name: 'Health', icon: 'fitness_center' }
  ]
};

export default (state = initialState, action) => {
  let newState = Object.assign({}, state);

  switch (action.type) {
    default:
      return newState;
  }
};
