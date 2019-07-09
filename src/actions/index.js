import constants from '../constants';

export default {
  actionTest: (...params) => {
    return {
      type: constants.TEST,
      data: params
    };
  }
};
