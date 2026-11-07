'use client'

import { useMemo, useState } from 'react'
import { X } from 'lucide-react'
import {
  cases,
  getCasesByCategory,
  getCategory,
  type CategoryId,
} from '@/lib/career-data'
import { applyFilters, defaultFilters, type CaseFilters } from '@/lib/filters'
import { SiteHeader } from '@/components/site-header'
import { CategoryGrid } from '@/components/category-grid'
import { CareerTree } from '@/components/career-tree'
import { FilterBar } from '@/components/filter-bar'
import { CaseList } from '@/components/case-list'
import { CategoryIcon } from '@/components/category-icon'

export default function Page() {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null)
  const [selectedLeaf, setSelectedLeaf] = useState<string | null>(null)
  const [filters, setFilters] = useState<CaseFilters>(defaultFilters)

  const category = selectedCategory ? getCategory(selectedCategory) : null

  const filteredCases = useMemo(() => {
    let base = selectedCategory ? getCasesByCategory(selectedCategory) : cases
    if (selectedLeaf) base = base.filter((c) => c.path.includes(selectedLeaf))
    return applyFilters(base, filters, query)
  }, [selectedCategory, selectedLeaf, filters, query])

  function handleSelectCategory(id: CategoryId) {
    setSelectedCategory((prev) => (prev === id ? null : id))
    setSelectedLeaf(null)
  }

  function handleFilterChange(key: keyof CaseFilters, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  function resetAll() {
    setFilters(defaultFilters)
    setSelectedLeaf(null)
    setQuery('')
  }

  return (
    <main className="min-h-dvh bg-background">
      <SiteHeader query={query} onQueryChange={setQuery} />

      <div className="mx-auto max-w-6xl space-y-12 px-5 py-12">
        <CategoryGrid selected={selectedCategory} onSelect={handleSelectCategory} />

        {/* 選択中のカテゴリー表示 */}
        {category && (
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-muted-foreground">選択中：</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 font-medium text-primary-foreground">
              <CategoryIcon name={category.icon} className="size-3.5" />
              {category.label}
              {selectedLeaf && <span className="opacity-80">/ {selectedLeaf}</span>}
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory(null)
                setSelectedLeaf(null)
              }}
              className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-3.5" />
              解除
            </button>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* 左サイドバー：キャリアツリー */}
          {category ? (
            <aside className="lg:sticky lg:top-6 lg:self-start">
              <CareerTree
                category={category}
                selectedLeaf={selectedLeaf}
                onLeafSelect={setSelectedLeaf}
              />
            </aside>
          ) : (
            <aside className="hidden lg:block lg:sticky lg:top-6 lg:self-start">
              <div className="rounded-2xl border border-dashed border-border bg-card p-6 text-center">
                <p className="text-sm font-medium text-foreground">
                  カテゴリーを選んでみましょう
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  上のカードからキャリアの方向を選ぶと、ここに詳しい職種ツリーが表示され、事例をさらに絞り込めます。
                </p>
              </div>
            </aside>
          )}

          {/* 右カラム：フィルター＋事例 */}
          <div className="space-y-6">
            <FilterBar
              filters={filters}
              onChange={handleFilterChange}
              onReset={() => setFilters(defaultFilters)}
            />
            <CaseList items={filteredCases} onReset={resetAll} />
          </div>
        </div>
      </div>

      <footer className="border-t border-border py-8">
        <p className="text-center text-xs text-muted-foreground">
          ナースキャリアマップ
        </p>
      </footer>
    </main>
  )
}
