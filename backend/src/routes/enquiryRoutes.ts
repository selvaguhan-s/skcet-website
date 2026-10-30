import { Router, Request, Response } from 'express';
import Enquiry from '../models/Enquiry.js';

const router = Router();

interface EnquiryRequest {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  query?: unknown;
}

router.post(
  '/',
  async (
    req: Request<{}, {}, EnquiryRequest>,
    res: Response
  ): Promise<void> => {
    try {
      const { name, phone, email, query } = req.body;

      // Check that all fields are strings.
      if (
        typeof name !== 'string' ||
        typeof phone !== 'string' ||
        typeof email !== 'string' ||
        typeof query !== 'string'
      ) {
        res.status(400).json({
          message: 'Please provide all enquiry fields.'
        });
        return;
      }

      // Remove unnecessary spaces.
      const cleanName = name.trim();
      const cleanPhone = phone.trim();
      const cleanEmail = email.trim().toLowerCase();
      const cleanQuery = query.trim();

      // Check for empty fields.
      if (
        !cleanName ||
        !cleanPhone ||
        !cleanEmail ||
        !cleanQuery
      ) {
        res.status(400).json({
          message: 'All fields are required.'
        });
        return;
      }

      // Validate name length.
      if (cleanName.length > 100) {
        res.status(400).json({
          message: 'Name cannot exceed 100 characters.'
        });
        return;
      }

      // Validate phone number.
      if (
        cleanPhone.length > 20 ||
        !/^[0-9+\s()-]{7,20}$/.test(cleanPhone)
      ) {
        res.status(400).json({
          message: 'Please enter a valid phone number.'
        });
        return;
      }

      // Validate email.
      if (
        cleanEmail.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
      ) {
        res.status(400).json({
          message: 'Please enter a valid email address.'
        });
        return;
      }

      // Limit the query to 500 words.
      const wordCount = cleanQuery.split(/\s+/).length;

      if (wordCount > 500) {
        res.status(400).json({
          message: 'Your query cannot exceed 500 words.'
        });
        return;
      }

      // Create the enquiry.
      const enquiry = new Enquiry({
        name: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        query: cleanQuery
      });

      // Save the enquiry to MongoDB.
      const savedEnquiry = await enquiry.save();

      // Send a success response.
      res.status(201).json({
        message: 'Your enquiry has been submitted successfully.',
        enquiryId: savedEnquiry._id
      });

    } catch (error) {
      console.error('Error saving enquiry:', error);

      res.status(500).json({
        message: 'Unable to submit your enquiry. Please try again later.'
      });
    }
  }
);

export default router;
