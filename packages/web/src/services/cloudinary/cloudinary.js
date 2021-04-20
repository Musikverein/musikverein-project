import axios from 'axios';

export async function imageUpload(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'upload_preset',
    process.env.REACT_APP_CLOUDINARY_PRESET_PROFILE_IMG,
  );
  formData.append('resource_type', 'image');

  const response = await axios.post(
    process.env.REACT_APP_CLOUDINARY_IMG_URL,
    formData,
  );
  return response.data.secure_url;
}

export async function songUpload(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'upload_preset',
    process.env.REACT_APP_CLOUDINARY_PRESET_SONGS,
  );
  formData.append('resource_type', 'video');

  const response = await axios.post(
    process.env.REACT_APP_CLOUDINARY_IMG_URL,
    formData,
  );
  return response.data;
}
