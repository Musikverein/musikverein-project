import React from 'react';
import ContentLoader from 'react-content-loader';

const PlaylistCardSpinner = (props) => (
  <ContentLoader
    speed={1}
    width={400}
    height={180}
    viewBox="0 0 400 180"
    backgroundColor="#a3a3a3"
    foregroundColor="#6b6b6b"
    {...props}
  >
    <rect x="5" y="2" rx="4" ry="4" width="150" height="150" />
    <rect x="9" y="165" rx="4" ry="4" width="103" height="13" />
  </ContentLoader>
);

export default PlaylistCardSpinner;
