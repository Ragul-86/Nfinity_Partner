export function GlassCard({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag
      className={`bg-glass-fill border border-glass-border backdrop-blur-xl rounded-2xl shadow-glow ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
