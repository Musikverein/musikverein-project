import React from 'react';
import ContentLoader from 'react-content-loader';

const SongCardSpinner = (props) => (
  <ContentLoader
    speed={1}
    width={1000}
    height={76}
    viewBox="0 0 1000 76"
    backgroundColor="#a3a3a3"
    foregroundColor="#6b6b6b"
    {...props}
  >
    <rect x="123" y="5" rx="4" ry="4" width="200" height="13" />
    <rect x="124" y="28" rx="4" ry="4" width="103" height="13" />
    <rect x="55" y="1" rx="4" ry="4" width="48" height="43" />
    <circle cx="23" cy="23" r="10" />
  </ContentLoader>
);

export default SongCardSpinner;
