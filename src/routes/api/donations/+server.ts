import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { DonationModel } from '$lib/models/Donation';
import { ProjectModel } from '$lib/models/Project';
import { connectDB } from '$lib/db/mongodb';
import { initiateMpesaPayment } from '$lib/utils/mpesa';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { projectId, amount, phoneNumber } = await request.json();

    // Validate input
    if (!projectId || !amount || !phoneNumber) {
      return new Response('Missing required fields', { status: 400 });
    }

    await connectDB();

    // Check if project exists
    const project = await ProjectModel.findById(projectId);
    if (!project) {
      return new Response('Project not found', { status: 404 });
    }

    // Create donation record
    const donation = await DonationModel.create({
      projectId,
      amount,
      phoneNumber,
      status: 'pending'
    });

    // Initiate M-Pesa payment
    try {
      const mpesaResponse = await initiateMpesaPayment({
        phoneNumber,
        amount,
        donationId: donation._id.toString()
      });

      return json({
        message: 'Donation initiated successfully',
        donationId: donation._id,
        checkoutRequestId: mpesaResponse.CheckoutRequestID
      });
    } catch (mpesaError) {
      // If M-Pesa initiation fails, mark donation as failed
      await DonationModel.findByIdAndUpdate(donation._id, { status: 'failed' });
      console.error('M-Pesa payment initiation failed:', mpesaError);
      return new Response('Failed to initiate payment', { status: 500 });
    }
  } catch (error) {
    console.error('Failed to process donation:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}; 