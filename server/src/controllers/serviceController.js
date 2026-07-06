import Service from '../models/Service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { ApiError } from '../utils/ApiError.js';

// GET /api/v1/services
export const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find({ isPublished: true }).sort({ order: 1 }).select('-__v');
  sendSuccess(res, { message: 'Services fetched', data: services });
});

// GET /api/v1/services/:slug
export const getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug, isPublished: true });
  if (!service) throw ApiError.notFound('Service not found');
  sendSuccess(res, { message: 'Service fetched', data: service });
});
