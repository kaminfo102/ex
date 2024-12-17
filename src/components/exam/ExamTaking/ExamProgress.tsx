import React from 'react';

interface Props {
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: number[];
}

export default function ExamProgress({ currentQuestion, totalQuestions, answeredQuestions }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600">
          سوال {currentQuestion + 1} از {totalQuestions}
        </span>
        <span className="text-sm text-gray-600">
          پاسخ داده شده: {answeredQuestions.length} از {totalQuestions}
        </span>
      </div>
      
      <div className="grid grid-cols-10 gap-2">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full ${
              answeredQuestions.includes(index)
                ? 'bg-green-500'
                : index === currentQuestion
                ? 'bg-blue-500'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}