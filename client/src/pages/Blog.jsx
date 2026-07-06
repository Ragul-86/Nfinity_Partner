import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO.js';
import { useFetch } from '../hooks/useFetch.js';
import { apiClient } from '../lib/apiClient.js';
import { JsonLd, organizationSchema } from '../components/shared/JsonLd.jsx';
import { LoadingState, ErrorState, EmptyState } from '../components/shared/PageState.jsx';

import { SectionHero } from '../components/sections/SectionHero.jsx';
import { BlogCard } from '../components/sections/BlogCard.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { GlassCard } from '../components/ui/GlassCard.jsx';
import { Button } from '../components/ui/Button.jsx';

const CATEGORIES = [
  'All',
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
];

export default function Blog() {
  useSEO({
    title: 'Blog | Profit-First Growth Insights For D2C Brands',
    description:
      'Practical, profit-first insights on performance marketing, CRO, retention, and growth systems for D2C and ecommerce founders.',
  });

  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);

  const { data: posts, loading, error } = useFetch(
    () =>
      apiClient.get('/blog', {
        category: category === 'All' ? undefined : category,
        page,
        limit: 9,
      }),
    [category, page]
  );
  const { data: recentPosts } = useFetch(() => apiClient.get('/blog', { limit: 5 }), []);

  function handleCategoryChange(cat) {
    setCategory(cat);
    setPage(1);
  }

  return (
    <>
      <JsonLd id="blog-org" data={organizationSchema()} />

      <SectionHero
        eyebrow="The Blog"
        eyebrowClassName="border border-glass-border bg-glass-fill px-3 py-1 text-[1.5rem] leading-[2rem] font-medium tracking-wide text-cyan-glow-400"
        headline="Profit-First Growth Insights."
        subheadline="Practical breakdowns on performance marketing, CRO, retention, and the systems that actually move profit — not just traffic."
        size="md"
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
          <div>
            {/* Category filter bar */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    category === cat
                      ? 'bg-gradient-accent text-navy-950'
                      : 'border border-glass-border bg-glass-fill text-slate-400 hover:text-white-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Post grid */}
            <div className="mt-10">
              {loading && <LoadingState label="Loading posts..." />}
              {error && <ErrorState message="Couldn't load blog posts right now." />}
              {!loading && !error && (!posts || posts.length === 0) && (
                <EmptyState message="No posts in this category yet." />
              )}
              {!loading && !error && posts && posts.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2">
                  {posts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex items-center justify-center gap-3">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={page === 1 ? 'opacity-40' : ''}
              >
                ← Previous
              </Button>
              <span className="text-sm text-slate-400">Page {page}</span>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setPage((p) => p + 1)}
                disabled={!posts || posts.length < 9}
                className={!posts || posts.length < 9 ? 'opacity-40' : ''}
              >
                Next →
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-8">
            <GlassCard className="p-6">
              <h3 className="font-display font-semibold text-white-100">Most Read</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {(recentPosts || []).slice(0, 5).map((post) => (
                  <li key={post.slug}>
                    <Link to={`/blog/${post.slug}`} className="text-sm text-slate-400 hover:text-cyan-glow-400">
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="font-display font-semibold text-white-100">Categories</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                  <Badge key={cat}>{cat}</Badge>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6 text-center">
              <h3 className="font-display font-semibold text-white-100">Enjoying These Insights?</h3>
              <p className="mt-2 text-sm text-slate-400">
                Book a free profit audit and put them into action — reviewed personally by the founder.
              </p>
              <Button href="/contact" className="mt-5 w-full" withArrow>
                Book Your Free Profit Audit
              </Button>
            </GlassCard>
          </aside>
        </div>
      </section>
    </>
  );
}
