import { z } from 'zod';

export const enquirySchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100).trim(),
  companyName: z.string().max(150).trim().optional(),
  designation: z.string().max(100).trim().optional(),
  email: z.string().email('Please enter a valid email address').max(254).toLowerCase().trim(),
  mobile: z.string().min(10, 'Please enter a valid mobile number').max(15)
    .regex(/^[\+]?[0-9\s\-\.]{10,15}$/, 'Please enter a valid mobile number'),
  projectLocation: z.string().max(200).trim().optional(),
  city: z.string().max(100).trim().optional(),
  serviceRequired: z.string().max(200).trim().optional(),
  productRequired: z.string().max(200).trim().optional(),
  projectDescription: z.string().max(2000).trim().optional(),
  sourcePage: z.string().max(100).optional(),
  sourceProduct: z.string().max(100).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
