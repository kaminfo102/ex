import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import api from '../../../utils/api';
import Timer from '../Timer';
import ExamProgress from './ExamProgress';
import QuestionDisplay from './QuestionDisplay';
import NavigationControls from './NavigationControls';
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

  const submitMutation = useMutation(
    async (examAnswers: Record<number, number[]>) => {
      await api.post(`/exams/${examId}/submit`, { answers: examAnswers });
    },
    {
      onSuccess: () => {
        toast.success('آزمون با موفقیت ثبت شد');
        window.location.href = `/exams/${examId}/result`;
      },
      onError: () => {
        toast.error('خطا در ثبت آزمون');
      }
    }
  );

  useEffect(() => {
    if (exam?.duration) {
      setTimeRemaining(exam.duration * 60); // Convert minutes to seconds
    }
  }, [exam]);

  const currentQuestion = questions?.[currentQuestionIndex];
  const answeredQuestions = Object.keys(answers).map(Number);

  const handleAnswerSelect = (optionId: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.question_id]: [optionId]
    }));
  };

  const handleSubmit = () => {
    if (window.confirm('آیا از پایان آزمون اطمینان دارید؟')) {
      submitMutation.mutate(answers);
    }
  };

  if (!exam || !questions) return <div>در حال بارگذاری...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-xl font-bold">{exam.exam_title}</h1>
        <Timer
          initialTime={timeRemaining}
          onTimeEnd={handleSubmit}
        />
      </div>

      <ExamProgress
        currentQuestion={currentQuestionIndex}
        totalQuestions={questions.length}
        answeredQuestions={answeredQuestions}
      />

      <QuestionDisplay
        question={currentQuestion}
        selectedAnswers={answers[currentQuestion.question_id] || []}
        onAnswerSelect={handleAnswerSelect}
      />

      <NavigationControls
        onPrevious={() => setCurrentQuestionIndex(prev => prev - 1)}
        onNext={() => setCurrentQuestionIndex(prev => prev + 1)}
        onSubmit={handleSubmit}
        isFirst={currentQuestionIndex === 0}
        isLast={currentQuestionIndex === questions.length - 1}
      />
    </div>
  );
}