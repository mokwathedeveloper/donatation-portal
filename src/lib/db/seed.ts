import { connectDB } from './mongodb';
import { ProjectModel } from '$lib/models/Project';

const sampleProjects = [
  {
    title: "Clean Water Initiative",
    description: "Help provide clean drinking water to communities in need. This project aims to install water purification systems in areas with limited access to safe drinking water.",
    goal: 10000,
    amountRaised: 2500,
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e",
  },
  {
    title: "Education for All",
    description: "Support underprivileged children's education by providing school supplies, books, and funding for teachers. Every child deserves access to quality education.",
    goal: 15000,
    amountRaised: 7500,
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
  },
  {
    title: "Sustainable Agriculture",
    description: "Help local farmers adopt sustainable farming practices. This project provides training, equipment, and resources for environmentally friendly agriculture.",
    goal: 8000,
    amountRaised: 3200,
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854",
  },
];

async function seed() {
  try {
    await connectDB();
    
    // Clear existing projects
    await ProjectModel.deleteMany({});
    
    // Insert sample projects
    await ProjectModel.insertMany(sampleProjects);
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 