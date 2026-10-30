import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import enquiryRoutes from './routes/enquiryRoutes.js';

const app = express();

const PORT = Number(process.env.PORT) || 5000;

// Support your local frontend and your deployed frontend.
const allowedOrigins = [
  'http://localhost:5173',
  ...(process.env.FRONTEND_URL || '')
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean)
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by CORS'));
      }
    }
  })
);

app.use(express.json({ limit: '20kb' }));

// Test route: open the backend URL to check that it is running.
app.get('/', (_req, res) => {
  res.json({
    message: 'SKCET TypeScript Backend is running!'
  });
});

// Connect to MongoDB when an enquiry request arrives.
app.use('/api/enquiries', async (_req, res, next) => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      res.status(500).json({
        message: 'Database configuration is missing.'
      });
      return;
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(mongoUri);
    }

    next();
  } catch (error) {
    console.error('MongoDB connection failed:', error);

    res.status(500).json({
      message: 'Unable to connect to the database.'
    });
  }
});

app.use('/api/enquiries', enquiryRoutes);

// Run a normal server locally, but let Vercel handle production requests.
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
  });
}

export default app;