import React from 'react';
import { useQuery } from 'react-query';
import api from '../../utils/api';

export default function DashboardStats() {
  const { data: stats } = useQuery('dashboard-stats', async () => {
    const { data } = await api.get('/admin/stats');
    return data;
  });

  const statItems = [
    { title: 'کل کاربران', value: stats?.totalUsers || 0 },
    { title: 'آزمون‌های فعال', value: stats?.activeExams || 0 },
    { title: 'پرداخت‌های امروز', value: stats?.todayPayments || 0 },
    { title: 'درآمد کل', value: `${stats?.totalRevenue?.toLocaleString() || 0} تومان` },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <div key={index} className="card bg-white p-6">
          <h3 className="text-sm text-gray-500">{item.title}</h3>
          <p className="text-2xl font-bold mt-2">{item.value}</p>
        </div>
      ))}
    </div>
  );
}