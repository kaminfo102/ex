import React from 'react';
import { useQuery } from 'react-query';
import api from '../../../utils/api';
import { Question } from '../../../types';

interface Props {
  selectedQuestions: number[];
  onQuestionSelect: (questionId: number) => void;
  categoryId?: number;
  difficultyLevel?: string;
}

export default function QuestionSelector({ 
  selectedQuestions, 
  onQuestionSelect,
  categoryId,
  difficultyLevel 
}: Props) {
  const { data: questions, isLoading } = useQuery(
    ['questions', categoryId, difficultyLevel],
    async () => {
      const params = new URLSearchParams();
      if (categoryId) params.append('category_id', categoryId.toString());
      if (difficultyLevel) params.append('difficulty_level', difficultyLevel);
      
      const { data } = await api.get(`/questions?${params.toString()}`);
      return data;
    }
  );

  if (isLoading) return <div>در حال بارگذاری سوالات...</div>;

  return (
    <div className="space-y-4">
      {questions?.map((question: Question) => (
        <div 
          key={question.question_id}
          className={`p-4 border rounded-lg cursor-pointer transition-colors
            ${selectedQuestions.includes(question.question_id) 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-300'}`}
          onClick={() => onQuestionSelect(question.question_id)}
        >
          <div className="flex justify-between items-start">
            <p className="text-gray-800">{question.question_text}</p>
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
        </div>
      ))}
    </div>
  );
}