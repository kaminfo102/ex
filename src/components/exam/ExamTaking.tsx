import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import api from '../../utils/api';
import { Question } from '../../types';
import Timer from './Timer';
import toast from 'react-hot-toast';

interface Props {
  examId: number;
}

export default function ExamTaking({ examId }: Props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  const { data: exam } = useQuery(['exam', examId], async () => {
    const { data } = await api.get(`/exams/${examId}`);
    return data;
  });

  const { data: questions } = useQuery(['exam-questions', examId], async () => {
    const { data } = await api.get(`/exams/${examId}/questions`);
    return data;
  });

  const currentQuestion = questions?.[currentQuestionIndex];

  const handleAnswerSelect = (optionId: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.question_id]: [optionId]
    }));
  };

  const handleSubmit = async () => {
    try {
      await api.post(`/exams/${examId}/submit`, { answers });
      toast.success('آزمون با موفقیت ثبت شد');
      window.location.href = `/exams/${examId}/result`;
    } catch (error) {
      toast.error('خطا در ثبت آزمون');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{exam?.exam_title}</h2>
        <Timer initialTime={timeRemaining} onTimeEnd={handleSubmit} />
      </div>

      <div className="card">
        <div className="mb-4">
          <span className="text-sm text-gray-500">
            سوال {currentQuestionIndex + 1} از {questions?.length}
          </span>
        </div>

        <div className="space-y-4">
          <p className="text-lg">{currentQuestion?.question_text}</p>
          
          {currentQuestion?.question_image && (
            <img 
              src={currentQuestion.question_image} 
              alt="تصویر سوال"
              className="max-w-full h-auto rounded-lg"
            />
          )}

          <div className="space-y-2">
            {currentQuestion?.options.map((option) => (
              <label
                key={option.option_id}
                className={`block p-4 border rounded-lg cursor-pointer hover:bg-gray-50
                  ${answers[currentQuestion.question_id]?.includes(option.option_id) 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200'}`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.question_id}`}
                  value={option.option_id}
                  checked={answers[currentQuestion.question_id]?.includes(option.option_id)}
                  onChange={() => handleAnswerSelect(option.option_id)}
                  className="mr-2"
                />
                {option.option_text}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            disabled={currentQuestionIndex === 0}
            className="btn-secondary"
          >
            سوال قبلی
          </button>
          
          {currentQuestionIndex === questions?.length - 1 ? (
            <button onClick={handleSubmit} className="btn-primary">
              پایان آزمون
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              className="btn-primary"
            >
              سوال بعدی
            </button>
          )}
        </div>
      </div>
    </div>
  );
}