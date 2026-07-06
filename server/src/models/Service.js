import mongoose from 'mongoose';

const FAQSchema = new mongoose.Schema(
  { q: { type: String, required: true }, a: { type: String, required: true } },
  { _id: false }
);

const ServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    icon: { type: String, trim: true }, // lucide-react icon name
    shortDescription: { type: String, required: true, trim: true, maxlength: 200 },
    heroHeadline: { type: String, required: true },
    heroSubheadline: { type: String, required: true },
    sections: [
      {
        heading: String,
        body: String,
        order: Number,
      },
    ],
    faqs: [FAQSchema],
    finalCtaHeadline: String,
    finalCtaBody: String,
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
    seo: {
      title: String,
      description: String,
    },
  },
  { timestamps: true }
);

ServiceSchema.index({ order: 1 });

export default mongoose.model('Service', ServiceSchema);
