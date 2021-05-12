import { combineReducers } from 'redux';

import authReducer from './auth/auth-reducer';
import SongReducer from './song/song-reducer';
import playerReducer from './player/player-reducer';
import PlayListReducer from './playList/playList-reducer';
import LibrarySongReducer from './librarySongs/librarySong-reducer';
import LibraryPlayListReducer from './libraryPlayList/libraryPlayList-reducer';
import SearchReducer from './search/search-reducer';
import UserReducer from './user/user-reducer';
import UserViewReducer from './userView/userView-reducer';
import GenresReducer from './genre/genre-reducer';
import HomeReducer from './Home/home-reducer';

const entitiesReducer = combineReducers({
  songStore: SongReducer,
  playListStore: PlayListReducer,
  userStore: UserReducer,
  genreStore: GenresReducer,
});
const uiReducer = combineReducers({
  player: playerReducer,
  librarySongs: LibrarySongReducer,
  libraryPlayList: LibraryPlayListReducer,
  search: SearchReducer,
  userView: UserViewReducer,
  home: HomeReducer,
});

const rootReducer = combineReducers({
  auth: authReducer,
  entities: entitiesReducer,
  ui: uiReducer,
});

export default rootReducer;
