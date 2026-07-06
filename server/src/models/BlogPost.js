import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Performance Marketing',
        'Website Development',
        'SEO',
        'Social Media Marketing',
        'Personal Branding & Product Photography',
        'Online Marketing',
        'Digital Branding',
        'Software & App Development',
        'LinkedIn Automation',
        'General',
      ],
    },
    excerpt: { type: String, required: true, trim: true, maxlength: 300 },
    content: { type: String, required: true }, // markdown/HTML body
    coverImage: { type: String, trim: true },
    author: { type: String, trim: true, default: 'Nfinity Partner Team' },
    readTimeMinutes: { type: Number, default: 5 },
    relatedService: { type: String, trim: true }, // service slug for contextual CTA
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
    seo: {
      title: String,
      description: String,
    },
  },
  { timestamps: true }
);

BlogPostSchema.index({ category: 1, isPublished: 1 });
BlogPostSchema.index({ publishedAt: -1 });

export default mongoose.model('BlogPost', BlogPostSchema);
