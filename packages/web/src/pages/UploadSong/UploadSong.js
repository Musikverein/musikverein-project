import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  uploadSong,
  uploadSongReset,
} from '../../redux/mySongs/mySong-actions';
import { songSelector } from '../../redux/song/song-selectors';

import Header from '../../components/Header';
import Dropzone from '../../components/Dropzone';
import SongForm from '../../components/SongForm';

import { metaImgToBase64 } from '../../utils/utils';

export const UploadSong = () => {
  const jsmediatags = window.jsmediatags;

  const { isUploadingSong, uploadSongSuccess } = useSelector(songSelector);
  const dispatch = useDispatch();

  const [loadSong, setLoadSong] = useState(null);
  const [metaSong, setMetaSong] = useState({});

  useEffect(() => {
    dispatch(uploadSongReset());
    return () => {
      setLoadSong(null);
    };
  }, [dispatch]);

  useEffect(() => {
    if (uploadSongSuccess) {
      setLoadSong(null);
    }
  }, [uploadSongSuccess]);

  const handleSongLoad = async (file) => {
    jsmediatags.read(file, {
      onSuccess: ({ tags }) => {
        const cover = metaImgToBase64(tags.picture?.data, tags.picture?.format);
        setMetaSong({
          songTitle: tags.title || '',
          songArtist: tags.artist || '',
          songGenre: tags.genre || '',
          defaultImg: cover,
        });
        setLoadSong(file);
      },
    });
  };

  const handleSubmit = ({ title, artist, genre, image, recaptchaToken }) => {
    dispatch(
      uploadSong({
        song: loadSong,
        title: title,
        artist: artist,
        genre: genre,
        image: image,
        recaptchaToken: recaptchaToken,
      }),
    );
  };

  return (
    <>
      <Header />
      <main className="main-container">
        <div className="h-full w-full flex flex-col justify-center items-center p-4">
          <h4>Upload Audio File</h4>
          {loadSong ? (
            <SongForm
              {...metaSong}
              handleSubmit={handleSubmit}
              isLoading={isUploadingSong}
              handleCancel={() => setLoadSong(null)}
            />
          ) : (
            <Dropzone
              onFileSelected={(files) => {
                // eslint-disable-next-line no-console
                handleSongLoad(files[0]);
              }}
            />
          )}
        </div>
      </main>
    </>
  );
};
