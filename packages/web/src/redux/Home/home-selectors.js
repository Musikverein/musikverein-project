import { createSelector } from 'reselect';

export const selectHomeState = (state) => state.ui.home;

export const homeSelector = createSelector([selectHomeState], (home) => home);
