import CaseStudy from '../models/CaseStudy.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { ApiError } from '../utils/ApiError.js';

// GET /api/v1/case-studies?industry=Fashion&page=1&limit=12
export const getCaseStudies = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit, 10) || 12, 50);
  const filter = { isPublished: true };
  if (req.query.industry) filter.industry = req.query.industry;
  if (req.query.featured === 'true') filter.isFeatured = true;

  const [items, total] = await Promise.all([
    CaseStudy.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-__v'),
    CaseStudy.countDocuments(filter),
  ]);

  sendSuccess(res, {
    message: 'Case studies fetched',
    data: items,
    meta: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

// GET /api/v1/case-studies/:slug
export const getCaseStudyBySlug = asyncHandler(async (req, res) => {
  const item = await CaseStudy.findOne({ slug: req.params.slug, isPublished: true });
  if (!item) throw ApiError.notFound('Case study not found');
  sendSuccess(res, { message: 'Case study fetched', data: item });
});
