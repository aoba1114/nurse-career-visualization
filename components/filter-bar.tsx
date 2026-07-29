'use client'

import { ChevronDown, RotateCcw, SlidersHorizontal } from 'lucide-react'
import {
  countActiveFilters,
  filterGroups,
  type CaseFilters,
} from '@/lib/filters'

export function FilterBar({
  filters,
  onChange,
  onReset,
}: {
  filters: CaseFilters
  onChange: (key: keyof CaseFilters, value: string) => void
  onReset: () => void
}) {
  const activeCount = countActiveFilters(filters)

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <SlidersHorizontal className="size-4 text-primary" />
          条件で絞り込む
          {activeCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
              {activeCount}
            </span>
          )}
        </h3>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="size-3.5" />
            リセット
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {filterGroups.map((group) => (
          <label key={group.key} className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">{group.label}</span>
            <div className="relative">
              <select
                value={filters[group.key]}
                onChange={(e) => onChange(group.key, e.target.value)}
                className="w-full appearance-none rounded-lg border border-border bg-background py-2 pl-3 pr-8 text-sm text-foreground outline-none transition-colors hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-ring/40"
              >
                {group.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}
