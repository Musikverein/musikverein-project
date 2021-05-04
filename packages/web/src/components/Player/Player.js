import React, { useState } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { useDispatch, useSelector } from 'react-redux';
import {
  nextSong,
  playSpecificSongInQueue,
  prevSong,
  reorderQueue,
} from '../../redux/player/player-actions';
import { playerSelector } from '../../redux/player/player-selectors';
import { selectSongByIdState } from '../../redux/song/song-selectors';

import LikeButton from '../LikeButton';

import 'react-h5-audio-player/lib/styles.css';
import './Player.scss';
import { ModalLayout } from '../ModalLayout/ModalLayout';
import { SongCard } from '../SongCard/SongCard';

export const Player = () => {
  const dispatch = useDispatch();
  const { queue, playingNow } = useSelector(playerSelector);
  const song = useSelector(selectSongByIdState(playingNow));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { title, artist, likedBy, _id, url } = song;

  const handleNext = () => {
    dispatch(nextSong());
  };

  const handlePrevious = () => {
    dispatch(prevSong());
  };

  const handleModalSong = () => {};

  const handleModalPlayList = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePlaySpecificSong = (songId) => {
    dispatch(playSpecificSongInQueue(songId));
  };

  const handleShuffle = () => {
    const items = queue.sort(() => 0.5 - Math.random());
    dispatch(reorderQueue(items));
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(queue);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(reorderQueue(items));
  };

  return (
    <section className="w-full flex flex-col items-center bg-black fixed bottom-0 pt-2 z-10 ">
      <div className="w-full justify-center bg-black flex items-center">
        <div className="w-full flex text-l items-center justify-around">
          <button type="button" onClick={handleModalSong} className="flex">
            <h2 className="text-l font-semibold text-light">{title} -</h2>
            <h3 className="text-m font-normal text-light">&nbsp;{artist}</h3>
          </button>
          <LikeButton likedBy={likedBy} songId={_id} text={false} />
        </div>
      </div>
      <div className="w-full">
        <AudioPlayer
          src={url}
          showSkipControls
          autoPlay
          showJumpControls={false}
          onClickNext={handleNext}
          onClickPrevious={handlePrevious}
          onEnded={handleNext}
          layout="stacked-reverse"
          style={{ backgroundColor: 'black', color: 'white' }}
          customControlsSection={[
            RHAP_UI.ADDITIONAL_CONTROLS,
            RHAP_UI.LOOP,
            RHAP_UI.MAIN_CONTROLS,
            <button
              type="button"
              key="shuffle"
              className="bx bx-shuffle text-3xl pl-2"
              onClick={handleShuffle}
            />,

            RHAP_UI.VOLUME_CONTROLS,
          ]}
          customAdditionalControls={[]}
          customVolumeControls={[
            <button
              type="button"
              key="x"
              className="bx bx-list-ul text-3xl pr-2"
              onClick={handleModalPlayList}
            />,
            RHAP_UI.VOLUME,
          ]}
        />
      </div>
      <ModalLayout isOpen={isModalOpen} handleClose={handleModalPlayList}>
        <div className="w-full h-full px-4 text-white pt-12">
          <h2 className="py-4 text-2xl">Queue</h2>
          <div className="pb-4">
            <h3>Now playing:</h3>
            <SongCard songId={playingNow} handlePlay={() => {}} playListId="" />
          </div>
          <div>
            <h3>Playlist:</h3>
            <div>
              <div className="playlist-songs">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="songs">
                    {(provided) => (
                      <ul
                        className="songs"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {queue.map((songId, index) => (
                          <Draggable
                            key={songId}
                            draggableId={songId}
                            index={index}
                          >
                            {(prov) => (
                              <li
                                key={songId}
                                ref={prov.innerRef}
                                {...prov.draggableProps}
                                {...prov.dragHandleProps}
                              >
                                <SongCard
                                  key={songId}
                                  songId={songId}
                                  handlePlay={() =>
                                    handlePlaySpecificSong({ songId: songId })
                                  }
                                  playListId=""
                                />
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          </div>
        </div>
      </ModalLayout>
    </section>
  );
};
