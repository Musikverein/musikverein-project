export const metaImgToBase64 = (image, format) => {
  if (image) {
    const base64String = btoa(String.fromCharCode(...image));

    return `data:${format};base64,${base64String}`;
  }

  return '';
};

export const secondsToString = (seconds) => {
  const minute = Math.floor((seconds / 60) % 60);
  let second = Math.floor(seconds % 60);
  second = second < 10 ? `0${second}` : second;
  return `${minute}:${second}`;
};
