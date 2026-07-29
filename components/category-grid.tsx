'use client'

import { ChevronRight } from 'lucide-react'
import { categories, getCasesByCategory, type CategoryId } from '@/lib/career-data'
import { CategoryIcon } from './category-icon'
import { cn } from '@/lib/utils'

export function CategoryGrid({
  selected,
  onSelect,
}: {
  selected: CategoryId | null
  onSelect: (id: CategoryId) => void
}) {
  return (
    <section aria-labelledby="category-heading" className="w-full">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2
            id="category-heading"
            className="text-xl font-semibold tracking-tight text-foreground md:text-2xl"
          >
            キャリアの方向を選ぶ
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            気になるカテゴリーを選ぶと、詳しい職種と事例が表示されます。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => {
          const count = getCasesByCategory(cat.id).length
          const active = selected === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelect(cat.id)}
              aria-pressed={active}
              className={cn(
                'group flex flex-col items-start gap-3 rounded-2xl border bg-card p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md md:p-5',
                active
                  ? 'border-primary/60 shadow-md ring-1 ring-primary/30'
                  : 'border-border hover:border-primary/30',
              )}
            >
              <span
                className={cn(
                  'flex size-11 items-center justify-center rounded-xl transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground',
                )}
              >
                <CategoryIcon name={cat.icon} className="size-5" />
              </span>

              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{cat.label}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {cat.description}
                </p>
              </div>

              <span className="flex w-full items-center justify-between text-xs font-medium text-muted-foreground">
                <span>事例 {count} 件</span>
                <ChevronRight
                  className={cn(
                    'size-4 transition-transform group-hover:translate-x-0.5',
                    active && 'text-primary',
                  )}
                />
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
