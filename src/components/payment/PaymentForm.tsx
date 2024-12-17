import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../../utils/api';
import toast from 'react-hot-toast';

interface PaymentFormData {
  exam_id: number;
  payment_method: string;
}

interface Props {
  examId: number;
  price: number;
  onSuccess: () => void;
}

export default function PaymentForm({ examId, price, onSuccess }: Props) {
  const { handleSubmit, register } = useForm<PaymentFormData>({
    defaultValues: {
      exam_id: examId,
      payment_method: 'online',
    },
  });

  const onSubmit = async (data: PaymentFormData) => {
    try {
      const response = await api.post('/payments/create', data);
      if (response.data.payment_url) {
        window.location.href = response.data.payment_url;
      }
      onSuccess();
    } catch (error) {
      toast.error('خطا در پردازش پرداخت');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">اطلاعات پرداخت</h3>
        
        <div className="mb-4">
          <p className="text-gray-600">مبلغ قابل پرداخت:</p>
          <p className="text-2xl font-bold">{price.toLocaleString()} تومان</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">روش پرداخت</label>
          <select {...register('payment_method')} className="input mt-1">
            <option value="online">درگاه پرداخت آنلاین</option>
            <option value="wallet">کیف پول</option>
          </select>
        </div>

        <button type="submit" className="btn-primary w-full">
          پرداخت و شرکت در آزمون
        </button>
      </div>
    </form>
  );
}