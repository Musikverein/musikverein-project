import * as UserTypes from './user-types';

export const loadUsers = (users) => ({
  type: UserTypes.LOAD_USERS,
  payload: users,
});

export const removeUser = (userId) => ({
  type: UserTypes.REMOVE_USER,
  payload: userId._id,
});
