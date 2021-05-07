import * as UserTypes from './user-types';

export const UserInitialState = {
  users: {},
};

const UserReducer = (state = UserInitialState, action) => {
  switch (action.type) {
    case UserTypes.LOAD_USERS: {
      return {
        ...state,
        users: { ...state.users, ...action.payload },
      };
    }
    case UserTypes.REMOVE_USER: {
      const newState = { ...state.users };
      delete newState[action.payload];
      return {
        ...state,
        users: { ...newState },
      };
    }
    default: {
      return state;
    }
  }
};

export default UserReducer;
