import React from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export const Player = ({ playList }) => {
  console.log(playList[0]?.url);
  return (
    <section>
      <div className="w-full">
        <h1>Es el player</h1>
        <AudioPlayer src={playList[0]?.url} layout="horizontal" />
      </div>
    </section>
  );
};
Player.propTypes = {
  playList: PropTypes.array.isRequired,
};
