import { Router } from 'express';
import { createLead, getLeads, getLeadById, updateLeadStatus } from '../controllers/leadController.js';
import { validate } from '../middleware/validate.js';
import { createLeadSchema, updateLeadStatusSchema } from '../validators/leadValidator.js';
import { leadLimiter } from '../middleware/rateLimiter.js';
import { requireInternalKey } from '../middleware/requireInternalKey.js';

const router = Router();

// Public — the contact form posts here.
router.post('/', leadLimiter, validate(createLeadSchema), createLead);

// Reserved for the admin dashboard (Phase 2 — full JWT + role-based auth).
// Guarded by a shared internal API key in the meantime so lead PII isn't
// publicly readable. See requireInternalKey.js.
router.get('/', requireInternalKey, getLeads);
router.get('/:id', requireInternalKey, getLeadById);
router.patch('/:id/status', requireInternalKey, validate(updateLeadStatusSchema), updateLeadStatus);

export default router;
