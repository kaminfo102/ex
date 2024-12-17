import api from './api';

export const uploadFile = async (file: File, type: 'image' | 'audio' | 'video') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  try {
    const { data } = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.url;
  } catch (error) {
    throw new Error('خطا در آپلود فایل');
  }
};

export const getFileUrl = (path: string | null) => {
  if (!path) return null;
  return `${api.defaults.baseURL}/files/${path}`;
};