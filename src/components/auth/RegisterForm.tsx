import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../../utils/api';
import toast from 'react-hot-toast';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>();
  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await api.post('/auth/register', data);
      toast.success('ثبت‌نام با موفقیت انجام شد');
      window.location.href = '/login';
    } catch (error) {
      toast.error('خطا در ثبت‌نام');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">نام کاربری</label>
        <input
          type="text"
          {...register('username', { required: 'نام کاربری الزامی است' })}
          className="input mt-1"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">ایمیل</label>
        <input
          type="email"
          {...register('email', {
            required: 'ایمیل الزامی است',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'ایمیل نامعتبر است'
            }
          })}
          className="input mt-1"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">رمز عبور</label>
        <input
          type="password"
          {...register('password', {
            required: 'رمز عبور الزامی است',
            minLength: {
              value: 8,
              message: 'رمز عبور باید حداقل 8 کاراکتر باشد'
            }
          })}
          className="input mt-1"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">تکرار رمز عبور</label>
        <input
          type="password"
          {...register('password_confirmation', {
            required: 'تکرار رمز عبور الزامی است',
            validate: value => value === password || 'رمز عبور و تکرار آن یکسان نیستند'
          })}
          className="input mt-1"
        />
        {errors.password_confirmation && (
          <p className="text-red-500 text-sm mt-1">{errors.password_confirmation.message}</p>
        )}
      </div>

      <button type="submit" className="btn-primary w-full">
        ثبت‌نام
      </button>
    </form>
  );
}