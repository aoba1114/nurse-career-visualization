import { cn } from '@/lib/utils'

export function RatingMeter({
  value,
  max = 5,
  label,
  tone = 'primary',
}: {
  value: number
  max?: number
  label: string
  tone?: 'primary' | 'muted'
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1.5">
        <div className="flex gap-1" role="img" aria-label={`${value} / ${max}`}>
          {Array.from({ length: max }).map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-1.5 w-5 rounded-full transition-colors',
                i < value
                  ? tone === 'primary'
                    ? 'bg-primary'
                    : 'bg-foreground/70'
                  : 'bg-border',
              )}
            />
          ))}
        </div>
        <span className="text-xs font-semibold text-foreground">
          {value}
          <span className="text-muted-foreground">/{max}</span>
        </span>
      </div>
    </div>
  )
}
