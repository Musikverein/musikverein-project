import { combineReducers } from 'redux';

import authReducer from './auth/auth-reducer';
import SongReducer from './song/song-reducer';
import playerReducer from './player/player-reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  song: SongReducer,
  player: playerReducer,
});

export default rootReducer;
