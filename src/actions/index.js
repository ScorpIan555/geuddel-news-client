import constants from '../constants';
import { HTTPClient } from '../utils';

export default {
  actionTest: (...params) => {
    return {
      type: constants.TEST,
      data: params
    };
  },

  actionGetNews: body => {
    console.log('actionGetNews!!::: ', body);
    return dispatch => {
      console.log('actionGetNews2!!::: ', body);
      return dispatch(HTTPClient.asyncPost({
        type: constants.GET_NEWS, 
        endpoint: '/getNews',
        body: body
      })
      )}
  },




};
