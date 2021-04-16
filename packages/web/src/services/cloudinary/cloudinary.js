import axios from 'axios';

export async function imageUpload(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'musikverein');

  const response = await axios.post(
    process.env.REACT_APP_CLOUDINARY_IMG_URL,
    formData,
  );
  return response.data.secure_url;
}
