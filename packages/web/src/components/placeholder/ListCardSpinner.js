import React from 'react';
import SongCardSpinner from './SongCardSpinner';
import PlaylistCardSpinner from './PlaylistCardSpinner';
import UserCardSpinner from './UserCardSpinner';

const SpinnerList = ({ count = 5, type = 'Song' }) => {
  const elements = [];
  const components = {
    Song: SongCardSpinner,
    Playlist: PlaylistCardSpinner,
    User: UserCardSpinner,
  };
  const CustomComponent = components[type];
  for (let i = 0; i < count; i += 1) {
    elements.push(<CustomComponent key={i} />);
  }
  return elements.map((el) => el);
};

export default SpinnerList;
