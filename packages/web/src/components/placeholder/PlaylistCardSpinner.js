import React from 'react';
import ContentLoader from 'react-content-loader';

const PlaylistCardSpinner = (props) => (
  <ContentLoader
    speed={1}
    width={160}
    height={180}
    viewBox="0 0 160 180"
    backgroundColor="#a3a3a3"
    foregroundColor="#6b6b6b"
    {...props}
  >
    <rect x="5" y="2" rx="4" ry="4" width="140" height="140" />
    <rect x="9" y="155" rx="4" ry="4" width="103" height="13" />
  </ContentLoader>
);

export default PlaylistCardSpinner;
