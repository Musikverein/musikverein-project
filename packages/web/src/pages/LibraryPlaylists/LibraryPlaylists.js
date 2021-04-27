import React from 'react';

import Header from '../../components/Header';
import LibraryNav from '../../components/LibraryNav';

export const LibraryPlaylists = () => {
  return (
    <>
      <Header />
      <LibraryNav />
      <main className="main-container-library">
        {/* <LibrarySelect
          value={currentPath}
          title="Song"
          optionMyValue={MySongTypes.MY_SONG_PATH_OWN_SONGS}
          optionLikeValue={MySongTypes.MY_SONG_PATH_LIKED_SONGS}
          handleSelect={handleSelect}
        /> */}

        {/* <section className="bg__primary">
          {isGettingSong ? (
            <Spinner />
          ) : (
            mySongs.length > 0 &&
            mySongs.map((songId) => <SongCard key={songId} songId={songId} />)
          )}
        </section> */}
      </main>
    </>
  );
};
