import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import api from '../../../utils/api';

interface ExamSettings {
  exam_title: string;
  exam_description: string;
  category_id: number;
  is_paid: boolean;
  price: number;
  start_time: string;
  end_time: string;
  duration: number;
}

interface Props {
  onSubmit: (data: ExamSettings) => void;
  initialData?: Partial<ExamSettings>;
}

export default function ExamSettings({ onSubmit, initialData }: Props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ExamSettings>({
    defaultValues: initialData,
  });

  const isPaid = watch('is_paid');

  const { data: categories } = useQuery('categories', async () => {
    const { data } = await api.get('/categories');
    return data;
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">عنوان آزمون</label>
        <input
          type="text"
          {...register('exam_title', { required: 'عنوان آزمون الزامی است' })}
          className="input mt-1"
        />
        {errors.exam_title && (
          <p className="text-red-500 text-sm mt-1">{errors.exam_title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">توضیحات</label>
        <textarea
          {...register('exam_description')}
          rows={3}
          className="input mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">دسته‌بندی</label>
        <select {...register('category_id')} className="input mt-1">
          <option value="">انتخاب دسته‌بندی</option>
          {categories?.map((category: any) => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">زمان شروع</label>
          <input
            type="datetime-local"
            {...register('start_time')}
            className="input mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">زمان پایان</label>
          <input
            type="datetime-local"
            {...register('end_time')}
            className="input mt-1"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">مدت زمان آزمون (دقیقه)</label>
        <input
          type="number"
          {...register('duration', { min: 1 })}
          className="input mt-1"
        />
      </div>

      <div className="flex items-center space-x-2 space-x-reverse">
        <input
          type="checkbox"
          {...register('is_paid')}
          className="rounded text-blue-600"
        />
        <label className="text-sm font-medium text-gray-700">آزمون پولی</label>
      </div>

      {isPaid && (
        <div>
          <label className="block text-sm font-medium text-gray-700">قیمت (تومان)</label>
          <input
            type="number"
            {...register('price', { required: isPaid })}
            className="input mt-1"
          />
        </div>
      )}

      <button type="submit" className="btn-primary">
        ذخیره تنظیمات
      </button>
    </form>
  );
}