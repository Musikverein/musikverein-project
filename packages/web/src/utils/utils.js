export const metaImgToBase64 = (image, format) => {
  if (image) {
    const base64String = btoa(String.fromCharCode(...image));

    return `data:${format};base64,${base64String}`;
  }

  return '';
};
