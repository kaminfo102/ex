import React from 'react';
import { useForm } from 'react-hook-form';
import { Question } from '../../types';

interface Props {
  onSubmit: (data: Partial<Question>) => void;
  initialData?: Question;
}

export default function QuestionForm({ onSubmit, initialData }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">متن سوال</label>
        <textarea
          {...register('question_text', { required: 'متن سوال الزامی است' })}
          className="input mt-1"
          rows={3}
        />
        {errors.question_text && (
          <p className="text-red-500 text-sm mt-1">{errors.question_text.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">سطح دشواری</label>
        <select {...register('difficulty_level')} className="input mt-1">
          <option value="easy">آسان</option>
          <option value="medium">متوسط</option>
          <option value="hard">سخت</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">تصویر سوال</label>
        <input
          type="file"
          accept="image/*"
          className="input mt-1"
          {...register('question_image')}
        />
      </div>

      <button type="submit" className="btn-primary">
        {initialData ? 'ویرایش سوال' : 'افزودن سوال'}
      </button>
    </form>
  );
}