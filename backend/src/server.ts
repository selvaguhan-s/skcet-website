import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import enquiryRoutes from './routes/enquiryRoutes.js';

const app = express();

const PORT = Number(process.env.PORT) || 5000;

const FRONTEND_URL =
  process.env.FRONTEND_URL || 'http://localhost:5173';

// Allow requests from the React frontend.
app.use(
  cors({
    origin: FRONTEND_URL
  })
);

// Read JSON request bodies.
app.use(express.json({ limit: '20kb' }));

// Test route.
app.get('/', (_req, res) => {
  res.json({
    message: 'SKCET TypeScript Backend is running!'
  });
});

// Enquiry API.
app.use('/api/enquiries', enquiryRoutes);

// Connect to MongoDB and start the server.
async function startServer(): Promise<void> {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error('MONGO_URI is missing from the .env file.');
    }

    await mongoose.connect(mongoUri);

    console.log('Connected to MongoDB successfully!');

    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

startServer();