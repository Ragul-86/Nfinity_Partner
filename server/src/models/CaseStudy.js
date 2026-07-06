import mongoose from 'mongoose';

const MetricSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    before: { type: String, trim: true },
    after: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const CaseStudySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    clientName: { type: String, required: true, trim: true },
    industry: {
      type: String,
      required: true,
      enum: ['Fashion', 'Saree', 'Apparel', 'CCTV & Networking', 'Education', 'Other'],
    },
    heroMetric: { type: String, required: true, trim: true }, // e.g. "18X Peak Return"
    summary: { type: String, required: true, trim: true, maxlength: 400 },
    challenge: { type: String, required: true },
    strategy: { type: String, required: true },
    execution: { type: String, required: true },
    results: { type: String, required: true },
    metrics: [MetricSchema],
    services: [{ type: String, trim: true }], // related service slugs
    coverImage: { type: String, trim: true },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    seo: {
      title: String,
      description: String,
    },
  },
  { timestamps: true }
);

CaseStudySchema.index({ industry: 1, isPublished: 1 });
CaseStudySchema.index({ order: 1 });

export default mongoose.model('CaseStudy', CaseStudySchema);
