import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFile } from '../../utils/upload';
import toast from 'react-hot-toast';

interface Props {
  onUpload: (url: string) => void;
  type: 'image' | 'audio' | 'video';
  accept: string;
}

export default function FileUploader({ onUpload, type, accept }: Props) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const file = acceptedFiles[0];
      const url = await uploadFile(file, type);
      onUpload(url);
      toast.success('فایل با موفقیت آپلود شد');
    } catch (error) {
      toast.error('خطا در آپلود فایل');
    }
  }, [onUpload, type]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { [accept]: [] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-500">فایل را رها کنید...</p>
      ) : (
        <div>
          <p className="text-gray-600">فایل را اینجا بکشید یا کلیک کنید</p>
          <p className="text-sm text-gray-500 mt-1">
            {type === 'image' && 'فرمت‌های مجاز: JPG, PNG'}
            {type === 'audio' && 'فرمت‌های مجاز: MP3, WAV'}
            {type === 'video' && 'فرمت‌های مجاز: MP4, WebM'}
          </p>
        </div>
      )}
    </div>
  );
}