// import constants from '../constants';

const initialState = {
  sidebarTop: [
    { nameString: 'Top Headlines', pathString: 'top-headlines' },
    { nameString: 'For You', pathString: 'for-you' },
    { nameString: 'Favorites', pathString: 'favorites' },
    { nameString: 'Saved Searches', pathString: 'saved-searches' }
  ],
  sidebarMiddle: [
    { name: 'US', icon: 'flag' },
    { name: 'World', icon: 'flag' },
    { name: 'Local', icon: 'flag' },
    { name: 'Business', icon: 'flag' },
    { name: 'Technology', icon: 'flag' },
    { name: 'Entertainment', icon: 'flag' },
    { name: 'Sports', icon: 'flag' },
    { name: 'Science', icon: 'flag' },
    { name: 'Health', icon: 'flag' }
  ]
};

export default (state = initialState, action) => {
  let newState = Object.assign({}, state);

  switch (action.type) {
    default:
      return newState;
  }
};
