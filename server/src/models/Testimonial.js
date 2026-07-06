import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true, trim: true },
    role: { type: String, trim: true }, // e.g. "Founder, ABC Sarees"
    brandName: { type: String, trim: true },
    quote: { type: String, required: true, trim: true, maxlength: 600 },
    avatar: { type: String, trim: true },
    relatedCaseStudy: { type: mongoose.Schema.Types.ObjectId, ref: 'CaseStudy' },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Testimonial', TestimonialSchema);
