import React from 'react';
import { Question } from '../../../types';

interface Props {
  question: Question;
  selectedAnswers: number[];
  onAnswerSelect: (optionId: number) => void;
}

export default function QuestionDisplay({ question, selectedAnswers, onAnswerSelect }: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{question.question_text}</h2>
          {question.question_image && (
            <img
              src={question.question_image}
              alt="تصویر سوال"
              className="max-w-full h-auto rounded-lg mb-4"
            />
          )}
          {question.question_audio && (
            <audio controls className="w-full mb-4">
              <source src={question.question_audio} type="audio/mpeg" />
              مرورگر شما از پخش صوت پشتیبانی نمی‌کند.
            </audio>
          )}
          {question.question_video && (
            <video controls className="w-full mb-4">
              <source src={question.question_video} type="video/mp4" />
              مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
            </video>
          )}
        </div>

        <div className="space-y-3">
          {question.options.map((option) => (
            <label
              key={option.option_id}
              className={`block p-4 border rounded-lg cursor-pointer transition-colors
                ${selectedAnswers.includes(option.option_id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'}`}
            >
              <input
                type="radio"
                name={`question-${question.question_id}`}
                value={option.option_id}
                checked={selectedAnswers.includes(option.option_id)}
                onChange={() => onAnswerSelect(option.option_id)}
                className="ml-2"
              />
              {option.option_text}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}