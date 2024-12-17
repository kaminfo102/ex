```typescript
import React, { useEffect, useState } from 'react';
import { zarinpal } from '../../utils/zarinpal';
import { useQuery } from 'react-query';
import api from '../../utils/api';

interface Props {
  authority: string;
  examId: number;
}

export default function PaymentVerification({ authority, examId }: Props) {
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [refId, setRefId] = useState<string>();

  const { data: exam } = useQuery(['exam', examId], async () => {
    const { data } = await api.get(`/exams/${examId}`);
    return data;
  });

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const result = await zarinpal.verify(authority, exam?.price || 0);
        setRefId(result.ref_id);
        setSuccess(true);
        // Redirect to exam after successful payment
        setTimeout(() => {
          window.location.href = `/exams/${examId}/start`;
        }, 3000);
      } catch (error) {
        setSuccess(false);
      } finally {
        setVerifying(false);
      }
    };

    if (authority && exam) {
      verifyPayment();
    }
  }, [authority, exam]);

  if (verifying) {
    return (
      <div className="card text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4">در حال تایید پرداخت...</p>
      </div>
    );
  }

  return (
    <div className="card text-center">
      {success ? (
        <>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">پرداخت موفق</h2>
          <p className="text-gray-600 mb-4">شماره پیگیری: {refId}</p>
          <p className="text-sm text-gray-500">در حال انتقال به صفحه آزمون...</p>
        </>
      ) : (
        <>
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">خطا در پرداخت</h2>
          <p className="text-gray-600 mb-4">متاسفانه پرداخت شما با موفقیت انجام نشد.</p>
          <a href={`/exams/${examId}`} className="btn-primary inline-block">
            بازگشت به صفحه آزمون
          </a>
        </>
      )}
    </div>
  );
}
```