import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../utils/api';
import toast from 'react-hot-toast';

interface Category {
  category_id: number;
  category_name: string;
  category_description: string;
  parent_id?: number;
}

interface Props {
  category: Category;
}

export default function CategoryCard({ category }: Props) {
  const queryClient = useQueryClient();
  
  const deleteMutation = useMutation(
    async (id: number) => {
      await api.delete(`/categories/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories');
        toast.success('دسته‌بندی با موفقیت حذف شد');
      },
      onError: () => {
        toast.error('خطا در حذف دسته‌بندی');
      }
    }
  );

  return (
    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{category.category_name}</h3>
          <p className="text-gray-600 text-sm mt-1">{category.category_description}</p>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <button
            onClick={() => window.location.href = `/admin/categories/${category.category_id}/edit`}
            className="btn-secondary text-sm"
          >
            ویرایش
          </button>
          <button
            onClick={() => {
              if (window.confirm('آیا از حذف این دسته‌بندی اطمینان دارید؟')) {
                deleteMutation.mutate(category.category_id);
              }
            }}
            className="btn-danger text-sm"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}