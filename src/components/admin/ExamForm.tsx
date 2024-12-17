import React from 'react';
import { useForm } from 'react-hook-form';
import { Exam } from '../../types';

interface Props {
  onSubmit: (data: Partial<Exam>) => void;
  initialData?: Exam;
}

export default function ExamForm({ onSubmit, initialData }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          className="input mt-1"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">زمان شروع</label>
          <input
            type="datetime-local"
            {...register('start_time', { required: 'زمان شروع الزامی است' })}
            className="input mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">زمان پایان</label>
          <input
            type="datetime-local"
            {...register('end_time', { required: 'زمان پایان الزامی است' })}
            className="input mt-1"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4 space-x-reverse">
        <input
          type="checkbox"
          {...register('is_paid')}
          className="rounded text-blue-600"
        />
        <label className="text-sm font-medium text-gray-700">آزمون پولی</label>
      </div>

      <button type="submit" className="btn-primary">
        {initialData ? 'ویرایش آزمون' : 'ایجاد آزمون'}
      </button>
    </form>
  );
}