import { createSelector } from "reselect";

export const selectAuthState = (state) => state.auth;

export const authSelector = createSelector([selectAuthState], (auth) => auth);
