import { z } from 'zod';
import { dev } from '$app/environment';

const envSchema = z.object({
  MONGODB_URI: z.string().optional(),
  JWT_SECRET: z.string().min(32).optional(),
  MPESA_CONSUMER_KEY: z.string().optional(),
  MPESA_CONSUMER_SECRET: z.string().optional(),
  MPESA_PASSKEY: z.string().optional(),
  MPESA_SHORTCODE: z.string().optional(),
  PUBLIC_BASE_URL: z.string().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment variables');
}

// Export environment variables with defaults
export const {
  MONGODB_URI = dev 
    ? 'mongodb://localhost:27017/donation-platform'
    : undefined,
  JWT_SECRET = 'development-jwt-secret-key-min-32-chars',
  MPESA_CONSUMER_KEY = '',
  MPESA_CONSUMER_SECRET = '',
  MPESA_PASSKEY = '',
  MPESA_SHORTCODE = '',
  PUBLIC_BASE_URL = dev ? 'http://localhost:5173' : undefined,
} = parsedEnv.data; 