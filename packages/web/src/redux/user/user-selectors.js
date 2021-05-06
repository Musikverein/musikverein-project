import { createSelector } from 'reselect';

export const selectUserState = (state) => state.entities.userStore;

export const userSelector = createSelector([selectUserState], (user) => user);

export const selectUserByIdState = (id) =>
  createSelector(
    (state) => state.entities.userStore.users[id],
    (usersIds) => usersIds,
  );
