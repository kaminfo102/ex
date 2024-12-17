import React from 'react';
import { useForm } from 'react-hook-form';

interface CategoryFormData {
  category_name: string;
  category_description: string;
  parent_id?: number;
}

interface Props {
  onSubmit: (data: CategoryFormData) => void;
  categories?: Array<{ category_id: number; category_name: string }>;
  initialData?: CategoryFormData;
}

export default function CategoryForm({ onSubmit, categories, initialData }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<CategoryFormData>({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">نام دسته‌بندی</label>
        <input
          type="text"
          {...register('category_name', { required: 'نام دسته‌بندی الزامی است' })}
          className="input mt-1"
        />
        {errors.category_name && (
          <p className="text-red-500 text-sm mt-1">{errors.category_name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">توضیحات</label>
        <textarea
          {...register('category_description')}
          className="input mt-1"
          rows={3}
        />
      </div>

      {categories && (
        <div>
          <label className="block text-sm font-medium text-gray-700">دسته‌بندی والد</label>
          <select {...register('parent_id')} className="input mt-1">
            <option value="">بدون والد</option>
            {categories.map(category => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
      )}

      <button type="submit" className="btn-primary">
        {initialData ? 'ویرایش دسته‌بندی' : 'ایجاد دسته‌بندی'}
      </button>
    </form>
  );
}