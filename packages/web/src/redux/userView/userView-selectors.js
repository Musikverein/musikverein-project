import { createSelector } from 'reselect';

export const selectUserViewState = (state) => state.ui.userView;

export const userViewSelector = createSelector(
  [selectUserViewState],
  (userView) => userView,
);
