// src/components/category/CategoryList.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';
import CategoryCard from './CategoryCard';
import CategoryTree from './CategoryTree';
import ClientProvider from '../Provider';
import { AxiosError } from 'axios';

interface Category {
  category_id: number;
  title: string;
  description?: string;
  parent_id: number | null;
  icon?: string;
  exam_count?: number;
  children?: Category[];
}

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
  </div>
);

const ErrorMessage: React.FC<{ error: string }> = ({ error }) => (
  <div className="text-center text-red-600 p-4 rounded-lg bg-red-50">
    <p>خطا در دریافت اطلاعات:</p>
    <p className="text-sm mt-1">{error}</p>
  </div>
);

function CategoryListContent() {
  const { 
    data: categories, 
    isLoading, 
    isError,
    error 
  } = useQuery<Category[], AxiosError>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/categories');
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage error={error?.message || 'خطای ناشناخته'} />;
  if (!categories?.length) {
    return (
      <div className="text-center text-gray-600 p-4">
        هیچ دسته‌بندی‌ای یافت نشد.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold mb-4">ساختار درختی</h2>
        <div className="overflow-x-auto max-h-[500px]">
          <CategoryTree categories={categories} />
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold mb-4">لیست دسته‌بندی‌ها</h2>
        <div className="space-y-4 overflow-y-auto max-h-[500px]">
          {categories.map((category) => (
            <CategoryCard 
              key={category.category_id} 
              category={category} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Wrapper component that includes the Provider
export default function CategoryList() {
  return (
    <ClientProvider>
      <CategoryListContent />
    </ClientProvider>
  );
}
