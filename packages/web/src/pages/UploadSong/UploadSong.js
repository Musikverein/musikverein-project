import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';
import Header from '../../components/Header';
import Dropzone from '../../components/Dropzone';

import { uploadSong } from '../../redux/song/song-actions';
import { selectSongState } from '../../redux/song/song-selectors';

export function UploadSong() {
  const reRef = useRef();
  const dispatch = useDispatch();
  const { isUploadingSong, uploadSongSuccess, uploadSongError } = useSelector(
    selectSongState,
  );

  async function handleSongUpload(file) {
    const recaptchaToken = await reRef.current.executeAsync();
    reRef.current.reset();
    dispatch(
      uploadSong({
        song: file,
        title: file.name,
        recaptchaToken: recaptchaToken,
      }),
    );
  }

  return (
    <>
      <Header />
      <div className="h-full p-4">
        <div className="h-full w-full flex flex-col justify-center items-center">
          <h4>Upload Audio File</h4>
          <Dropzone
            onFileSelected={(files) => {
              // eslint-disable-next-line no-console
              handleSongUpload(files[0]);
            }}
          />
          {isUploadingSong && <p>Uploading song...</p>}
          {uploadSongSuccess && <p>Upload successful!</p>}
          {uploadSongError && <p>Upload error!</p>}
        </div>
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_RECAPTCHA_WEB_KEY}
          size="invisible"
          ref={reRef}
        />
      </div>
    </>
  );
}
