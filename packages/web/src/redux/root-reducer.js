import { combineReducers } from 'redux';

import authReducer from './auth/auth-reducer';
import SongReducer from './song/song-reducer';
import playerReducer from './player/player-reducer';
import MySongReducer from './mySongs/mySong-reducer';

const entitiesReducer = combineReducers({ songStore: SongReducer });
const uiReducer = combineReducers({
  player: playerReducer,
  mySongs: MySongReducer,
});

const rootReducer = combineReducers({
  auth: authReducer,
  entities: entitiesReducer,
  ui: uiReducer,
});

export default rootReducer;
