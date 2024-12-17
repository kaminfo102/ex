```typescript
import React from 'react';
import { useQuery } from 'react-query';
import api from '../../utils/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ExamAnalytics {
  total_participants: number;
  average_score: number;
  score_distribution: Record<string, number>;
  completion_rate: number;
  difficulty_analysis: {
    easy: number;
    medium: number;
    hard: number;
  };
}

interface Props {
  examId: number;
}

export default function ExamAnalytics({ examId }: Props) {
  const { data: analytics } = useQuery(['exam-analytics', examId], async () => {
    const { data } = await api.get<ExamAnalytics>(`/exams/${examId}/analytics`);
    return data;
  });

  if (!analytics) return <div>در حال بارگذاری...</div>;

  const scoreData = {
    labels: Object.keys(analytics.score_distribution),
    datasets: [
      {
        label: 'توزیع نمرات',
        data: Object.values(analytics.score_distribution),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">تعداد شرکت‌کنندگان</h3>
          <p className="text-2xl font-bold">{analytics.total_participants}</p>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">میانگین نمرات</h3>
          <p className="text-2xl font-bold">{analytics.average_score.toFixed(2)}</p>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">نرخ تکمیل</h3>
          <p className="text-2xl font-bold">{(analytics.completion_rate * 100).toFixed(1)}%</p>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">توزیع نمرات</h3>
        <div className="h-64">
          <Bar data={scoreData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">تحلیل سطح دشواری</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h4 className="text-sm text-gray-600">آسان</h4>
            <div className="mt-1 h-2 bg-gray-200 rounded">
              <div
                className="h-full bg-green-500 rounded"
                style={{ width: `${analytics.difficulty_analysis.easy}%` }}
              />
            </div>
            <p className="text-sm mt-1">{analytics.difficulty_analysis.easy}%</p>
          </div>
          
          <div>
            <h4 className="text-sm text-gray-600">متوسط</h4>
            <div className="mt-1 h-2 bg-gray-200 rounded">
              <div
                className="h-full bg-yellow-500 rounded"
                style={{ width: `${analytics.difficulty_analysis.medium}%` }}
              />
            </div>
            <p className="text-sm mt-1">{analytics.difficulty_analysis.medium}%</p>
          </div>
          
          <div>
            <h4 className="text-sm text-gray-600">سخت</h4>
            <div className="mt-1 h-2 bg-gray-200 rounded">
              <div
                className="h-full bg-red-500 rounded"
                style={{ width: `${analytics.difficulty_analysis.hard}%` }}
              />
            </div>
            <p className="text-sm mt-1">{analytics.difficulty_analysis.hard}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```