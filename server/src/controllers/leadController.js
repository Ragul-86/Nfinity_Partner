import Lead from '../models/Lead.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { notifyNewLead } from '../utils/mailer.js';
import { logger } from '../utils/logger.js';

// POST /api/v1/leads — public
export const createLead = asyncHandler(async (req, res) => {
  const lead = await Lead.create(req.body);

  // Don't make the visitor wait on the email round-trip.
  notifyNewLead(lead).catch((err) => logger.error(err.message));

  sendSuccess(res, {
    statusCode: 201,
    message: 'Thanks — your free profit audit request has been received.',
    data: { id: lead._id },
  });
});

// GET /api/v1/leads — admin/editor only (reserved for Phase 2 auth)
export const getLeads = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const [leads, total] = await Promise.all([
    Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Lead.countDocuments(filter),
  ]);

  sendSuccess(res, {
    message: 'Leads fetched',
    data: leads,
    meta: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

// GET /api/v1/leads/:id — admin/editor only
export const getLeadById = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) throw ApiError.notFound('Lead not found');
  sendSuccess(res, { message: 'Lead fetched', data: lead });
});

// PATCH /api/v1/leads/:id/status — admin/editor only
export const updateLeadStatus = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status, ...(req.body.notes ? { notes: req.body.notes } : {}) },
    { new: true, runValidators: true }
  );
  if (!lead) throw ApiError.notFound('Lead not found');
  sendSuccess(res, { message: 'Lead updated', data: lead });
});
