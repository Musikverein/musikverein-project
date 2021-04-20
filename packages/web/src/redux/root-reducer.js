import { combineReducers } from 'redux';

import authReducer from './auth/auth-reducer';
import SongReducer from './song/song-reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  song: SongReducer,
});

export default rootReducer;
