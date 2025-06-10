import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { DonationModel } from '$lib/models/Donation';
import { ProjectModel } from '$lib/models/Project';
import { connectDB } from '$lib/db/mongodb';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const payload = await request.json();
    const { Body } = payload;

    if (!Body.stkCallback) {
      return json({ message: 'Invalid callback payload' }, { status: 400 });
    }

    const { ResultCode, ResultDesc, CallbackMetadata } = Body.stkCallback;
    const donationId = Body.stkCallback.CallbackData?.AccountReference;

    if (!donationId) {
      return json({ message: 'Missing donation reference' }, { status: 400 });
    }

    await connectDB();

    // Find the donation
    const donation = await DonationModel.findById(donationId);
    if (!donation) {
      return json({ message: 'Donation not found' }, { status: 404 });
    }

    if (ResultCode === 0) {
      // Payment successful
      const amount = CallbackMetadata?.Item?.find((item: any) => item.Name === 'Amount')?.Value;
      const mpesaTransactionId = CallbackMetadata?.Item?.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value;

      // Update donation status
      await DonationModel.findByIdAndUpdate(donationId, {
        status: 'completed',
        mpesaTransactionId
      });

      // Update project amount raised
      await ProjectModel.findByIdAndUpdate(donation.projectId, {
        $inc: { amountRaised: amount }
      });

      return json({ message: 'Payment processed successfully' });
    } else {
      // Payment failed
      await DonationModel.findByIdAndUpdate(donationId, {
        status: 'failed'
      });

      return json({ message: 'Payment failed', reason: ResultDesc });
    }
  } catch (error) {
    console.error('Failed to process M-Pesa callback:', error);
    return json({ message: 'Internal server error' }, { status: 500 });
  }
}; 