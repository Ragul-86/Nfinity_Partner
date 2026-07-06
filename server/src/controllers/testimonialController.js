import Testimonial from '../models/Testimonial.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';

// GET /api/v1/testimonials?featured=true
export const getTestimonials = asyncHandler(async (req, res) => {
  const filter = { isPublished: true };
  if (req.query.featured === 'true') filter.isFeatured = true;

  const items = await Testimonial.find(filter).sort({ order: 1, createdAt: -1 }).select('-__v');
  sendSuccess(res, { message: 'Testimonials fetched', data: items });
});
