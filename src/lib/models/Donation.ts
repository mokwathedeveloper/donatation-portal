import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  mpesaTransactionId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamps on save
donationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export type DonationStatus = "pending" | "completed" | "failed";

export type Donation = {
  _id: string;
  projectId: string;
  amount: number;
  phoneNumber: string;
  status: DonationStatus;
  mpesaTransactionId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const DonationModel = mongoose.models.Donation || mongoose.model<Donation>("Donation", donationSchema);
