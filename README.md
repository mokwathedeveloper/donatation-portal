# Donation Platform

A modern web application built with SvelteKit that allows anonymous donations to social projects through M-Pesa integration.

## Features

- 🎯 View and donate to social projects anonymously
- 💳 M-Pesa integration for secure payments
- 📊 Admin dashboard to track donations and project progress
- 🔒 Secure authentication for admin access
- 📱 Responsive design with modern UI
- 🚀 Real-time updates and loading states

## Tech Stack

- **Frontend**: SvelteKit, TailwindCSS, DaisyUI
- **Backend**: SvelteKit API Routes
- **Database**: MongoDB with Mongoose
- **Payment**: M-Pesa Integration
- **Authentication**: Custom auth with localStorage

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/mokwathedeveloper/donatation-portal.git
   cd donation-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with:
   ```
   MONGODB_URI=your_mongodb_uri
   MPESA_CONSUMER_KEY=your_mpesa_consumer_key
   MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
   MPESA_PASSKEY=your_mpesa_passkey
   MPESA_SHORTCODE=your_mpesa_shortcode
   ```

4. Seed the database:
   ```bash
   npm run seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
donation-platform/
├── src/
│   ├── lib/
│   │   ├── components/    # Reusable UI components
│   │   ├── db/           # Database configuration
│   │   ├── models/       # MongoDB models
│   │   ├── stores/       # Svelte stores
│   │   └── utils/        # Utility functions
│   ├── routes/
│   │   ├── admin/        # Admin dashboard
│   │   └── api/          # API endpoints
│   └── styles/           # Global styles
```

## API Endpoints

- `GET /api/projects` - Get all projects
- `POST /api/donations` - Create a new donation
- `GET /api/donations` - Get all donations (admin only)
- `POST /api/mpesa/callback` - M-Pesa callback endpoint

## Admin Access

- URL: `/admin`
- Default credentials:
  - Username: `admin`
  - Password: `admin123`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
