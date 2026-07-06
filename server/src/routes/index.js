import { Router } from 'express';
import leadRoutes from './leadRoutes.js';
import caseStudyRoutes from './caseStudyRoutes.js';
import serviceRoutes from './serviceRoutes.js';
import blogRoutes from './blogRoutes.js';
import testimonialRoutes from './testimonialRoutes.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Nfinity Partner API v1', data: { status: 'ok' } });
});

router.use('/leads', leadRoutes);
router.use('/case-studies', caseStudyRoutes);
router.use('/services', serviceRoutes);
router.use('/blog', blogRoutes);
router.use('/testimonials', testimonialRoutes);

export default router;
