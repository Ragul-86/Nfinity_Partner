import { useParams, Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';
import { useSEO } from '../hooks/useSEO.js';
import { useFetch } from '../hooks/useFetch.js';
import { apiClient } from '../lib/apiClient.js';
import { JsonLd, breadcrumbSchema } from '../components/shared/JsonLd.jsx';
import { LoadingState, ErrorState } from '../components/shared/PageState.jsx';

import { Badge } from '../components/ui/Badge.jsx';
import { CTASection } from '../components/sections/CTASection.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const { data: post, loading, error } = useFetch(() => apiClient.get(`/blog/${slug}`), [slug]);

  useSEO({
    title: post?.seo?.title || post?.title || 'Blog',
    description: post?.seo?.description || post?.excerpt,
  });

  if (loading) return <LoadingState label="Loading post..." />;
  if (error || !post) {
    return (
      <div className="py-32 text-center">
        <ErrorState message="We couldn't find that post." />
        <Link to="/case-studies#latest-insights" className="mt-4 inline-block text-sm font-medium text-electric-blue-400 hover:text-cyan-glow-400">
          ← Back to all posts
        </Link>
      </div>
    );
  }

  return (
    <>
      <JsonLd
        id="blog-post-breadcrumb"
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/case-studies#latest-insights' },
          { name: post.title, url: `/blog/${post.slug}` },
        ])}
      />

      <article className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
        <Badge>{post.category}</Badge>
        <h1 className="mt-5 font-display text-3xl font-bold text-white-100 sm:text-4xl">{post.title}</h1>
        <div className="mt-5 flex items-center gap-5 text-sm text-slate-400">
          <span className="flex items-center gap-1.5">
            <User size={14} /> {post.author || 'Nfinity Partner Team'}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {post.readTimeMinutes} min read
          </span>
        </div>

        <div className="mt-10 flex flex-col gap-5 text-slate-300">
          {post.content.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>

      <CTASection
        headline="Want Help Putting This Into Action?"
        body="Book a free strategy call and find out exactly where your funnel is leaking profit."
        cta={{ label: 'Book Your Free Profit Audit', href: '/contact' }}
      />

      <div className="pb-16 text-center">
        <Link to="/case-studies#latest-insights" className="text-sm font-medium text-electric-blue-400 hover:text-cyan-glow-400">
          ← Back to all posts
        </Link>
      </div>
    </>
  );
}
