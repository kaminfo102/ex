```typescript
import api from './api';

interface PaymentResponse {
  authority: string;
  payment_url: string;
}

interface VerifyResponse {
  ref_id: string;
  card_pan: string;
}

export const zarinpal = {
  async request(amount: number, description: string, callback_url: string): Promise<PaymentResponse> {
    try {
      const { data } = await api.post('/payments/zarinpal/request', {
        amount,
        description,
        callback_url
      });
      return data;
    } catch (error) {
      throw new Error('خطا در ایجاد درخواست پرداخت');
    }
  },

  async verify(authority: string, amount: number): Promise<VerifyResponse> {
    try {
      const { data } = await api.post('/payments/zarinpal/verify', {
        authority,
        amount
      });
      return data;
    } catch (error) {
      throw new Error('خطا در تایید پرداخت');
    }
  }
};
```