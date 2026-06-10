type BadgeVariant = 'low' | 'medium' | 'high';

const variants: Record<BadgeVariant, string> = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};

export const Badge = ({ variant }: { variant: BadgeVariant }) => {
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${variants[variant]}`}>
      {variant}
    </span>
  );
};