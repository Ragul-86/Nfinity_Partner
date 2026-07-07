import Lead from '../models/Lead.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { notifyNewLead } from '../utils/mailer.js';
import { logger } from '../utils/logger.js';

// POST /api/v1/leads — public
export const createLead = asyncHandler(async (req, res) => {
  // 1. Always save the lead first — data capture is the priority.
  const lead = await Lead.create(req.body);

  // 2. Attempt to send notification email. Failure must never lose the lead.
  let emailSent = false;
  try {
    await notifyNewLead(lead);
    emailSent = true;
  } catch (err) {
    logger.error(
      `Lead notification email FAILED for lead ${lead._id} (${lead.name} / ${lead.brandName}): ${err.message}`
    );
  }

  // 3. Respond with success regardless — the lead is safely in MongoDB.
  sendSuccess(res, {
    statusCode: 201,
    message: "Thank you! Your request has been received. We'll contact you within 24 hours.",
    data: { id: lead._id, emailSent },
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
