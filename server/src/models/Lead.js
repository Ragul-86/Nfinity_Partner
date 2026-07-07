import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    brandName: { type: String, required: true, trim: true, maxlength: 150 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 150 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    revenueRange: {
      type: String,
      enum: ['<10L', '10L-50L', '50L-2Cr', '2Cr+'],
      required: true,
    },
    bottleneck: {
      type: String,
      enum: ['acquisition', 'conversion', 'retention', 'tracking', 'not_sure'],
      required: false,
    },
    message: { type: String, trim: true, maxlength: 2000 },
    source: { type: String, trim: true, default: 'contact_form' },
    sourcePage: { type: String, trim: true },
    utm: {
      source: String,
      medium: String,
      campaign: String,
      term: String,
      content: String,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'call_booked', 'won', 'lost'],
      default: 'new',
    },
    notes: { type: String, trim: true, maxlength: 4000 },
  },
  { timestamps: true }
);

LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ status: 1 });
LeadSchema.index({ email: 1 });

export default mongoose.model('Lead', LeadSchema);
