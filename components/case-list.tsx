'use client'

import { SearchX } from 'lucide-react'
import { cases, type CareerCase } from '@/lib/career-data'
import { CaseCard } from './case-card'

export function CaseList({
  items,
  onReset,
}: {
  items: CareerCase[]
  onReset: () => void
}) {
  return (
    <section aria-labelledby="cases-heading">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2
            id="cases-heading"
            className="text-xl font-semibold tracking-tight text-foreground md:text-2xl"
          >
            キャリア事例
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            実際にその道を歩んだ先輩たちのリアルな経歴。
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
          {items.length} 件
        </span>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((c) => (
            <CaseCard key={c.id} data={c} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-secondary">
            <SearchX className="size-6 text-muted-foreground" />
          </span>
          {cases.length === 0 ? (
            <p className="text-sm font-medium text-foreground">事例を準備中です</p>
          ) : (
            <>
              <p className="text-sm font-medium text-foreground">
                条件に合う事例が見つかりませんでした
              </p>
              <p className="max-w-xs text-xs text-muted-foreground">
                検索キーワードやフィルターの条件を変更してみてください。
              </p>
              <button
                type="button"
                onClick={onReset}
                className="mt-1 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                条件をすべてリセット
              </button>
            </>
          )}
        </div>
      )}
    </section>
  )
}
