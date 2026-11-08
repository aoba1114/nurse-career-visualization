'use client'

import { Search, Sparkles, X } from 'lucide-react'
import { getRecommendedKeywords } from '@/lib/career-data'

export function SiteHeader({
  query,
  onQueryChange,
}: {
  query: string
  onQueryChange: (value: string) => void
}) {
  const suggestions = getRecommendedKeywords()
  const placeholder = suggestions.length
    ? `職種・企業名で検索（例：${suggestions.slice(0, 3).join('、')}）`
    : '職種・企業名で検索'

  return (
    <header className="border-b border-border bg-card/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-14 text-center md:py-20">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          ナースキャンバス — 看護師のキャリアを可視化する
        </span>

        <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
          あなたはどんなキャリアを
          <br className="hidden sm:block" />
          歩みたいですか？
        </h1>

        <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
          病院勤務から一般企業、大学院、助産師、海外まで。実際にその道へ進んだ先輩の事例から、あなたの将来を考えてみましょう。
        </p>

        <div className="mt-2 w-full max-w-xl">
          <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm transition-shadow focus-within:shadow-md focus-within:ring-2 focus-within:ring-ring/40">
            <Search className="size-5 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              aria-label="キャリアを検索"
            />
            {query && (
              <button
                type="button"
                onClick={() => onQueryChange('')}
                className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="検索をクリア"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {suggestions.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onQueryChange(s)}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
