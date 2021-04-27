import { combineReducers } from 'redux';

import authReducer from './auth/auth-reducer';
import SongReducer from './song/song-reducer';
import playerReducer from './player/player-reducer';
import PlayListReducer from './playList/playList-reducer';
import LibrarySongReducer from './librarySongs/librarySong-reducer';

const entitiesReducer = combineReducers({
  songStore: SongReducer,
  playListStore: PlayListReducer,
});
const uiReducer = combineReducers({
  player: playerReducer,
  librarySongs: LibrarySongReducer,
});

const rootReducer = combineReducers({
  auth: authReducer,
  entities: entitiesReducer,
  ui: uiReducer,
});

export default rootReducer;
