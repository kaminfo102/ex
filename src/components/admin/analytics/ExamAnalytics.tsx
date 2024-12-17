import React from 'react';
import { useQuery } from 'react-query';
import api from '../../../utils/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function ExamAnalytics() {
  const { data: analytics } = useQuery('exam-analytics', async () => {
    const { data } = await api.get('/admin/analytics/exams');
    return data;
  });

  if (!analytics) return <div>در حال بارگذاری...</div>;

  const participationData = {
    labels: analytics.participation_trend.map((item: any) => item.date),
    datasets: [{
      label: 'تعداد شرکت‌کنندگان',
      data: analytics.participation_trend.map((item: any) => item.count),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }]
  };

  const difficultyData = {
    labels: ['آسان', 'متوسط', 'سخت'],
    datasets: [{
      data: [
        analytics.difficulty_distribution.easy,
        analytics.difficulty_distribution.medium,
        analytics.difficulty_distribution.hard
      ],
      backgroundColor: [
        'rgba(34, 197, 94, 0.5)',
        'rgba(234, 179, 8, 0.5)',
        'rgba(239, 68, 68, 0.5)'
      ]
    }]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">کل آزمون‌ها</h3>
          <p className="text-3xl font-bold">{analytics.total_exams}</p>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">شرکت‌کنندگان امروز</h3>
          <p className="text-3xl font-bold">{analytics.today_participants}</p>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">میانگین نمره</h3>
          <p className="text-3xl font-bold">{analytics.average_score.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">روند شرکت‌کنندگان</h3>
          <Bar data={participationData} />
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">توزیع سطح دشواری</h3>
          <Pie data={difficultyData} />
        </div>
      </div>
    </div>
  );
}