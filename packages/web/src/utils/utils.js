export const metaImgToBase64 = (image, format) => {
  if (image) {
    const base64String = Buffer.from(image, 'base64').toString('base64');

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

export const toggleInArrayById = (array, id) => {
  const newArray = [...array];
  const index = newArray.findIndex((element) => element === id);
  if (index !== -1) {
    newArray.splice(index, 1);
  } else {
    newArray.push(id);
  }
  return newArray;
};
