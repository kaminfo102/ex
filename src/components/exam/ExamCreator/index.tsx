import React, { useState } from 'react';
import { useMutation } from 'react-query';
import api from '../../../utils/api';
import ExamSettings from './ExamSettings';
import QuestionDistribution from './QuestionDistribution';
import QuestionSelector from './QuestionSelector';
import toast from 'react-hot-toast';

export default function ExamCreator() {
  const [step, setStep] = useState(1);
  const [examData, setExamData] = useState({});
  const [distribution, setDistribution] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  const createExamMutation = useMutation(
    async (data: any) => {
      const { data: response } = await api.post('/exams', data);
      return response;
    },
    {
      onSuccess: () => {
        toast.success('آزمون با موفقیت ایجاد شد');
        window.location.href = '/admin/exams';
      },
      onError: () => {
        toast.error('خطا در ایجاد آزمون');
      }
    }
  );

  const handleExamSettingsSubmit = (data: any) => {
    setExamData(data);
    setStep(2);
  };

  const handleDistributionChange = (dist: any) => {
    setDistribution(dist);
    setStep(3);
  };

  const handleQuestionSelect = (questionId: number) => {
    setSelectedQuestions(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleSubmit = async () => {
    await createExamMutation.mutateAsync({
      ...examData,
      questions: selectedQuestions,
      distribution
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-8 space-x-reverse">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-title">تنظیمات آزمون</span>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-title">توزیع سوالات</span>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-title">انتخاب سوالات</span>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="card">
          <ExamSettings onSubmit={handleExamSettingsSubmit} />
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <QuestionDistribution onDistributionChange={handleDistributionChange} />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="card">
            <QuestionSelector
              selectedQuestions={selectedQuestions}
              onQuestionSelect={handleQuestionSelect}
            />
          </div>
          
          <div className="flex justify-end space-x-4 space-x-reverse">
            <button
              onClick={() => setStep(step - 1)}
              className="btn-secondary"
            >
              مرحله قبل
            </button>
            <button
              onClick={handleSubmit}
              className="btn-primary"
              disabled={selectedQuestions.length === 0}
            >
              ایجاد آزمون
            </button>
          </div>
        </div>
      )}
    </div>
  );
}