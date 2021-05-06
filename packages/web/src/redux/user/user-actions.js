import * as UserTypes from './user-types';

export const loadUsers = (songs) => ({
  type: UserTypes.LOAD_USERS,
  payload: songs,
});

export const removeUser = (songId) => ({
  type: UserTypes.REMOVE_USER,
  payload: songId._id,
});
