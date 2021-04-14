import React from 'react';

export const InfoProfile = () => {
  return (
    <>
      <div className="flex justify-around text-center p-6">
        <div>
          <span className="font-medium">0</span>
          <p className="font-light text-xs">PLAYLIST</p>
        </div>
        <div>
          <span className="font-medium">0</span>
          <p className="font-light text-xs">FOLLOWERS</p>
        </div>
        <div>
          <span className="font-medium">0</span>
          <p className="font-light text-xs">FOLLOWING</p>
        </div>
      </div>
      <div>
        <h4 className="font-medium text-center">PUBLIC SONGS</h4>
        <div>TODO: AQUI VAN LAS CANCIONES</div>
      </div>
    </>
  );
};
