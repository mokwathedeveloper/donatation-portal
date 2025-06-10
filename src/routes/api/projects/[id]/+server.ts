import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ProjectModel } from '$lib/models/Project';
import { connectDB } from '$lib/db/mongodb';

export const GET: RequestHandler = async ({ params }) => {
  try {
    await connectDB();
    const project = await ProjectModel.findById(params.id).lean();
    
    if (!project) {
      return new Response('Project not found', { status: 404 });
    }

    return json(project);
  } catch (error) {
    console.error('Failed to fetch project:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}; 