import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard.jsx';
import { Badge } from '../ui/Badge.jsx';

export function BlogCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block h-full">
      <GlassCard className="flex h-full flex-col gap-4 p-7 transition-all duration-200 group-hover:scale-[1.02] group-hover:border-electric-blue-400/50">
        <Badge>{post.category}</Badge>
        <h3 className="font-display text-lg font-semibold text-white-100">{post.title}</h3>
        <p className="text-sm text-slate-400">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock size={14} /> {post.readTimeMinutes} min read
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-electric-blue-400 group-hover:text-cyan-glow-400">
            Read <ArrowUpRight size={14} />
          </span>
        </div>
      </GlassCard>
    </Link>
  );
}
