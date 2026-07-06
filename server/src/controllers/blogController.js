import BlogPost from '../models/BlogPost.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { ApiError } from '../utils/ApiError.js';

// GET /api/v1/blog?category=&page=&limit=
export const getBlogPosts = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit, 10) || 9, 50);
  const filter = { isPublished: true };
  if (req.query.category) filter.category = req.query.category;
  if (req.query.featured === 'true') filter.isFeatured = true;

  const [items, total] = await Promise.all([
    BlogPost.find(filter)
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-content -__v'),
    BlogPost.countDocuments(filter),
  ]);

  sendSuccess(res, {
    message: 'Blog posts fetched',
    data: items,
    meta: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

// GET /api/v1/blog/:slug
export const getBlogPostBySlug = asyncHandler(async (req, res) => {
  const post = await BlogPost.findOne({ slug: req.params.slug, isPublished: true });
  if (!post) throw ApiError.notFound('Blog post not found');
  sendSuccess(res, { message: 'Blog post fetched', data: post });
});
