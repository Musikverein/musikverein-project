import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export const Player = ({ playList }) => {
  const [indexPlayList, setIndexPlayList] = useState(0);

  const handleNext = () => {
    if (indexPlayList === playList.length - 1) {
      setIndexPlayList(0);
    } else {
      setIndexPlayList(indexPlayList + 1);
    }
  };
  const handlePrevious = () => {
    if (indexPlayList === 0) {
      setIndexPlayList(0);
    } else {
      setIndexPlayList(indexPlayList - 1);
    }
  };
  const handleModalSong = () => {};

  return (
    <section className="w-full flex flex-col items-center bg-black fixed bottom-0">
      <button
        type="button"
        onClick={handleModalSong}
        className="w-full justify-center bg-black flex items-center"
      >
        {/* <div className="w-full h-full">
          <img
            src={playList[indexPlayList].image}
            alt={playList[indexPlayList].title}
            className="w-full h-full object-cover"
          />
        </div> */}
        <div className="flex">
          <h2>{playList[indexPlayList].title} -</h2>
          <h3>&nbsp;{playList[indexPlayList].artist}</h3>
        </div>
      </button>
      <div className="w-full">
        <AudioPlayer
          src={playList[indexPlayList]?.url}
          showSkipControls
          showJumpControls={false}
          onClickNext={handleNext}
          onClickPrevious={handlePrevious}
          onEnded={handleNext}
          style={{ backgroundColor: 'black' }}
        />
      </div>
    </section>
  );
};
Player.propTypes = {
  playList: PropTypes.array.isRequired,
};
