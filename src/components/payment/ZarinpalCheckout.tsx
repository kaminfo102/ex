```typescript
import React from 'react';
import { zarinpal } from '../../utils/zarinpal';
import toast from 'react-hot-toast';

interface Props {
  amount: number;
  examId: number;
  description: string;
}

export default function ZarinpalCheckout({ amount, examId, description }: Props) {
  const handlePayment = async () => {
    try {
      const callback_url = `${window.location.origin}/payments/verify?exam_id=${examId}`;
      const { payment_url } = await zarinpal.request(amount, description, callback_url);
      window.location.href = payment_url;
    } catch (error) {
      toast.error('خطا در ایجاد درخواست پرداخت');
    }
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">پرداخت با درگاه زرین‌پال</h3>
      
      <div className="mb-6">
        <p className="text-gray-600">مبلغ قابل پرداخت:</p>
        <p className="text-2xl font-bold">{amount.toLocaleString()} تومان</p>
      </div>

      <button onClick={handlePayment} className="btn-primary w-full">
        پرداخت و شرکت در آزمون
      </button>
      
      <div className="mt-4">
        <img
          src="/images/zarinpal-logo.svg"
          alt="زرین‌پال"
          className="h-8 mx-auto"
        />
      </div>
    </div>
  );
}
```