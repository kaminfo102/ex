import React from 'react';
import { Question } from '../../../types';
import { useMutation, useQueryClient } from 'react-query';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

interface Props {
  question: Question;
}

export default function QuestionCard({ question }: Props) {
  const queryClient = useQueryClient();
  
  const deleteMutation = useMutation(
    async (id: number) => {
      await api.delete(`/questions/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('questions');
        toast.success('سوال با موفقیت حذف شد');
      },
      onError: () => {
        toast.error('خطا در حذف سوال');
      }
    }
  );

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{question.question_text}</h3>
        <span className={`px-2 py-1 rounded text-sm
          ${question.difficulty_level === 'easy' ? 'bg-green-100 text-green-800' :
            question.difficulty_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'}`}
        >
          {question.difficulty_level === 'easy' ? 'آسان' :
           question.difficulty_level === 'medium' ? 'متوسط' : 'سخت'}
        </span>
      </div>

      {question.question_image && (
        <img 
          src={question.question_image} 
          alt="تصویر سوال"
          className="mt-2 max-h-32 rounded"
        />
      )}

      <div className="mt-4 space-y-2">
        {question.options.map((option) => (
          <div 
            key={option.option_id}
            className={`p-2 rounded ${option.is_correct ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}
          >
            {option.option_text}
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end space-x-2 space-x-reverse">
        <button
          onClick={() => window.location.href = `/admin/questions/${question.question_id}/edit`}
          className="btn-secondary"
        >
          ویرایش
        </button>
        <button
          onClick={() => {
            if (window.confirm('آیا از حذف این سوال اطمینان دارید؟')) {
              deleteMutation.mutate(question.question_id);
            }
          }}
          className="btn-danger"
        >
          حذف
        </button>
      </div>
    </div>
  );
}