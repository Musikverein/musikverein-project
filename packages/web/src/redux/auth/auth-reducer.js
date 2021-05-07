import * as AuthTypes from './auth-types';

export const AuthInitialState = {
  isSigningUp: false,
  signUpErrorMsg: null,
  isSigningOut: false,
  signOutError: null,
  isAuthenticated: false,
  isSendingPasswordReset: false,
  passwordResetError: null,
  passwordResetSent: false,
  currentUser: '',
  isUpdating: false,
  updatedError: null,
  updatedSuccess: false,
};

const AuthReducer = (state = AuthInitialState, action) => {
  switch (action.type) {
    case AuthTypes.SIGN_UP_REQUEST: {
      return {
        ...state,
        isSigningUp: true,
        signUpErrorMsg: null,
      };
    }
    case AuthTypes.SIGN_UP_ERROR: {
      return {
        ...state,
        isSigningUp: false,
        signUpErrorMsg: action.payload,
      };
    }
    case AuthTypes.SIGN_UP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        isSigningUp: false,
        signUpErrorMsg: null,
        currentUser: action.payload,
      };
    }
    case AuthTypes.SIGN_OUT_REQUEST: {
      return {
        ...state,
        isSigningOut: true,
        signOutError: null,
      };
    }
    case AuthTypes.SIGN_OUT_ERROR: {
      return {
        ...state,
        isSigningOut: false,
        signOutError: action.payload,
      };
    }
    case AuthTypes.SIGN_OUT_SUCCESS: {
      return {
        ...state,
        isSigningOut: false,
        signOutError: null,
        isAuthenticated: false,
        currentUser: {
          email: null,
        },
      };
    }
    case AuthTypes.SEND_PASSWORD_RESET_EMAIL_REQUEST: {
      return {
        ...state,
        isSendingPasswordReset: true,
        passwordResetError: null,
        passwordResetSent: false,
      };
    }
    case AuthTypes.SEND_PASSWORD_RESET_EMAIL_ERROR: {
      return {
        ...state,
        isSendingPasswordReset: false,
        passwordResetError: action.payload,
        passwordResetSent: false,
      };
    }
    case AuthTypes.SEND_PASSWORD_RESET_EMAIL_SUCCESS: {
      return {
        ...state,
        isSendingPasswordReset: false,
        passwordResetError: null,
        passwordResetSent: true,
      };
    }
    case AuthTypes.RESET_AUTH_STATE: {
      return {
        ...state,
        isSigningUp: false,
        signUpErrorMsg: null,
        isSigningOut: false,
        signOutError: null,
        isSendingPasswordReset: false,
        passwordResetError: null,
        passwordResetSent: false,
      };
    }
    case AuthTypes.UPDATE_PROFILE_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        updatedSuccess: false,
        updatedError: null,
      };
    }
    case AuthTypes.UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        isUpdating: false,
        updatedSuccess: true,
        updatedError: null,
        currentUser: action.payload,
      };
    }
    case AuthTypes.UPDATE_PROFILE_ERROR: {
      return {
        ...state,
        isUpdating: false,
        updatedSuccess: false,
        updatedError: action.payload,
      };
    }
    case AuthTypes.RESET_UPDATE_PROFILE: {
      return {
        ...state,
        isUpdating: false,
        updatedSuccess: false,
        updatedError: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
