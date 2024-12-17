import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import moment from 'jalali-moment';

// تعریف interface برای داده‌های آزمون
interface Exam {
  exam_id: number;
  exam_title: string;
  exam_description: string;
  start_time: string;
  is_paid: boolean;
  price: number;
}

// تعریف یک ثابت برای URL API
const API_BASE_URL = 'http://127.0.0.1:8000';

// کامپوننت جداگانه برای نمایش کارت آزمون
const ExamCard: React.FC<{ exam: Exam }> = ({ exam }) => {
  const formatPrice = (price: number): string => {
    return price.toLocaleString('fa-IR');
  };

  return (
    <div 
      key={exam.exam_id} 
      className="border p-4 rounded-lg hover:shadow-md transition-shadow duration-300 bg-white"
    >
      <h3 className="text-lg font-semibold text-gray-800">{exam.exam_title}</h3>
      <p className="text-gray-600 text-sm mt-2">{exam.exam_description}</p>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-sm text-gray-500 dir-rtl">
          {moment(exam.start_time).locale('fa').format('jYYYY/jMM/jDD HH:mm')}
        </span>
        <span 
          className={`
            px-3 py-1.5 rounded-full text-sm font-medium
            ${exam.is_paid 
              ? 'bg-yellow-100 text-yellow-800' 
              : 'bg-green-100 text-green-800'
            }
          `}
        >
          {exam.is_paid ? `${formatPrice(exam.price)} تومان` : 'رایگان'}
        </span>
      </div>
    </div>
  );
};

// کامپوننت اصلی لیست آزمون‌ها
export default function ExamList() {
  const { 
    data: exams, 
    isLoading, 
    isError, 
    error 
  } = useQuery<Exam[], AxiosError>({
    queryKey: ['exams'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE_URL}/exams`);
      return data;
    },
    staleTime: 60000, // داده‌ها برای 1 دقیقه تازه در نظر گرفته می‌شوند
    retry: 2, // در صورت خطا، 2 بار تلاش مجدد
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 p-4">
        خطا در دریافت اطلاعات: {error.message}
      </div>
    );
  }

  if (!exams?.length) {
    return (
      <div className="text-center text-gray-600 p-4">
        هیچ آزمونی یافت نشد.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {exams.map((exam) => (
        <ExamCard key={exam.exam_id} exam={exam} />
      ))}
    </div>
  );
}
