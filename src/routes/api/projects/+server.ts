import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ProjectModel } from '$lib/models/Project';
import { connectDB } from '$lib/db/mongodb';

export const GET: RequestHandler = async () => {
  try {
    await connectDB();
    const projects = await ProjectModel.find({}).lean();
    return json(projects);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}; 