import { MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_PASSKEY, MPESA_SHORTCODE } from './env';

interface MpesaPaymentParams {
  phoneNumber: string;
  amount: number;
  donationId: string;
}

interface MpesaResponse {
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  MerchantRequestID: string;
  CustomerMessage: string;
}

export async function initiateMpesaPayment({ phoneNumber, amount, donationId }: MpesaPaymentParams): Promise<MpesaResponse> {
  try {
    // Get access token
    const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
    const tokenResponse = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get access token');
    }

    const { access_token } = await tokenResponse.json();

    // Generate timestamp
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`).toString('base64');

    // Initiate STK push
    const stkResponse = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        BusinessShortCode: MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber.replace('+', ''),
        PartyB: MPESA_SHORTCODE,
        PhoneNumber: phoneNumber.replace('+', ''),
        CallBackURL: `${process.env.PUBLIC_BASE_URL}/api/mpesa/callback`,
        AccountReference: donationId,
        TransactionDesc: 'Donation Payment'
      })
    });

    if (!stkResponse.ok) {
      throw new Error('Failed to initiate payment');
    }

    return stkResponse.json();
  } catch (error) {
    console.error('M-Pesa payment initiation failed:', error);
    throw error;
  }
} 