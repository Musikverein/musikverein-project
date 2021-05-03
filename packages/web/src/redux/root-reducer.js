import { combineReducers } from 'redux';

import authReducer from './auth/auth-reducer';
import SongReducer from './song/song-reducer';
import playerReducer from './player/player-reducer';
import PlayListReducer from './playList/playList-reducer';
import LibrarySongReducer from './librarySongs/librarySong-reducer';
import LibraryPlayListReducer from './libraryPlayList/libraryPlayList-reducer';
import SearchReducer from './search/search-reducer';

const entitiesReducer = combineReducers({
  songStore: SongReducer,
  playListStore: PlayListReducer,
});
const uiReducer = combineReducers({
  player: playerReducer,
  librarySongs: LibrarySongReducer,
  libraryPlayList: LibraryPlayListReducer,
  search: SearchReducer,
});

const rootReducer = combineReducers({
  auth: authReducer,
  entities: entitiesReducer,
  ui: uiReducer,
});

export default rootReducer;
