import { z } from 'zod';

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
    brandName: z.string().trim().min(2, 'Enter your business name').max(150),
    email: z.string().trim().email('Enter a valid email address').max(150),
    phone: z
      .string()
      .trim()
      .min(7, 'Enter a valid phone number')
      .max(20),
    revenueRange: z.enum(['<10L', '10L-50L', '50L-2Cr', '2Cr+'], {
      errorMap: () => ({ message: 'Select a valid revenue range' }),
    }),
    bottleneck: z.enum(['acquisition', 'conversion', 'retention', 'tracking', 'not_sure'], {
      errorMap: () => ({ message: 'Select a valid growth bottleneck' }),
    }),
    message: z.string().trim().max(2000).optional().or(z.literal('')),
    sourcePage: z.string().trim().max(200).optional(),
    utm: z
      .object({
        source: z.string().optional(),
        medium: z.string().optional(),
        campaign: z.string().optional(),
        term: z.string().optional(),
        content: z.string().optional(),
      })
      .optional(),
  }),
});

export const updateLeadStatusSchema = z.object({
  body: z.object({
    status: z.enum(['new', 'contacted', 'qualified', 'call_booked', 'won', 'lost']),
    notes: z.string().trim().max(4000).optional(),
  }),
});
