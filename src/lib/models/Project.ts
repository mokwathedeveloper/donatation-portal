import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
  },
  amountRaised: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
    required: false,
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
projectSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export type Project = {
  _id: string;
  title: string;
  description: string;
  goal: number;
  amountRaised: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const ProjectModel = mongoose.models.Project || mongoose.model<Project>("Project", projectSchema);
