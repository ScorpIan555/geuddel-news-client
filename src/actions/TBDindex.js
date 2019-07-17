import { AwsAuthUtil } from '../utils';
import constants from '../constants';

export default {
  actionCreateUser: (...params) => {
    return dispatch => {
      return dispatch(
        AwsAuthUtil.postAsync({
          type: constants.CREATE_USER,
          params
        })
      );
    };
  },

  actionConfirmUser: (...params) => {
    return dispatch => {
      return dispatch(
        AwsAuthUtil.postAsync({
          type: constants.CONFIRM_USER,
          params
        })
      );
    };
  },

  actionSignInUser: (...params) => {
    return dispatch => {
      return dispatch(
        AwsAuthUtil.postAsync({
          type: constants.SIGN_IN_USER,
          params
        })
      );
    };
  },

  actionSignOutUser: () => {
    return dispatch => {
      return dispatch(
        AwsAuthUtil.deleteAsync({
          type: constants.SIGN_OUT_USER
        })
      );
    };
  },

  actionGetCurrentUser: () => {
    return dispatch => {
      return dispatch(
        AwsAuthUtil.getAsync({
          type: constants.GET_CURRENT_USER
          // data: params
        })
      );
    };
  },

  actionSubmitUserWelcomeData: userInput => {
    console.log('action.userInput', userInput);
    return dispatch => {
      return dispatch({
        type: constants.SUBMIT_USER_WELCOME_DATA,
        data: userInput
      });
    };
  },

  actionSubmitAddressForm: addressFormData => {
    console.log('action.actionSubmitAddressForm', addressFormData);
    return dispatch => {
      return dispatch({
        type: constants.SUBMIT_ADDRESS_FORM_DATA,
        data: addressFormData
      });
    };
  },

  actionChangeHeroImage: heroImageValue => {
    console.log('actionChangeHeroImage', heroImageValue);
    return {
      type: constants.CHANGE_HERO_IMAGE,
      data: heroImageValue
    };
  },

  actionSubmitVehicleData: formData => {
    console.log('actions.formData:::', formData);
    return dispatch => {
      return dispatch({
        type: constants.SUBMIT_VEHICLE_FORM_DATA,
        data: formData
      });
    };
  },

  actionSubmitDriverData: formData => {
    console.log('actions.submitFormData:::', formData);
    return dispatch => {
      return dispatch({
        type: constants.SUBMIT_DRIVER_FORM_DATA,
        data: formData
      });
    };
  },

  actionSubmitFinalData: formData => {
    console.log('actions.finalFormData:::', formData);
    return dispatch => {
      return dispatch({
        type: constants.SUBMIT_FINAL_FORM_DATA,
        data: formData
      });
    };
  }
};
