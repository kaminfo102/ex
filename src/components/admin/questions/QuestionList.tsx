import React from 'react';
import { useQuery } from 'react-query';
import api from '../../../utils/api';
import { Question } from '../../../types';
import QuestionCard from './QuestionCard';
import QuestionFilters from './QuestionFilters';

export default function QuestionList() {
  const [filters, setFilters] = React.useState({
    category_id: '',
    difficulty_level: '',
    search: '',
  });

  const { data: questions, isLoading } = useQuery(
    ['questions', filters],
    async () => {
      const params = new URLSearchParams();
      if (filters.category_id) params.append('category_id', filters.category_id);
      if (filters.difficulty_level) params.append('difficulty_level', filters.difficulty_level);
      if (filters.search) params.append('search', filters.search);
      
      const { data } = await api.get(`/questions?${params.toString()}`);
      return data;
    }
  );

  return (
    <div className="space-y-6">
      <QuestionFilters filters={filters} onFilterChange={setFilters} />
      
      {isLoading ? (
        <div>در حال بارگذاری سوالات...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions?.map((question: Question) => (
            <QuestionCard key={question.question_id} question={question} />
          ))}
        </div>
      )}
    </div>
  );
}