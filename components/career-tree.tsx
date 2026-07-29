'use client'

import { useState } from 'react'
import { ChevronDown, CornerDownRight } from 'lucide-react'
import type { Category, TreeNode } from '@/lib/career-data'
import { CategoryIcon } from './category-icon'
import { cn } from '@/lib/utils'

function TreeBranch({
  node,
  depth,
  selectedLeaf,
  onLeafSelect,
}: {
  node: TreeNode
  depth: number
  selectedLeaf: string | null
  onLeafSelect: (label: string | null) => void
}) {
  const hasChildren = !!node.children?.length
  const [open, setOpen] = useState(depth === 0)
  const isSelected = selectedLeaf === node.label

  if (!hasChildren) {
    return (
      <button
        type="button"
        onClick={() => onLeafSelect(isSelected ? null : node.label)}
        aria-pressed={isSelected}
        className={cn(
          'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors',
          isSelected
            ? 'bg-primary text-primary-foreground'
            : 'text-foreground hover:bg-accent hover:text-accent-foreground',
        )}
      >
        <CornerDownRight
          className={cn(
            'size-3.5 shrink-0',
            isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground',
          )}
        />
        {node.label}
      </button>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-foreground transition-colors hover:bg-secondary"
      >
        {node.label}
        <ChevronDown
          className={cn(
            'size-4 shrink-0 text-muted-foreground transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>
      {open && (
        <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-border pl-2">
          {node.children!.map((child) => (
            <TreeBranch
              key={child.label}
              node={child}
              depth={depth + 1}
              selectedLeaf={selectedLeaf}
              onLeafSelect={onLeafSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function CareerTree({
  category,
  selectedLeaf,
  onLeafSelect,
}: {
  category: Category
  selectedLeaf: string | null
  onLeafSelect: (label: string | null) => void
}) {
  return (
    <section
      aria-label={`${category.label}のキャリアツリー`}
      className="rounded-2xl border border-border bg-card p-5 shadow-sm"
    >
      <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <CategoryIcon name={category.icon} className="size-5" />
        </span>
        <div>
          <h2 className="font-semibold text-foreground">{category.label}</h2>
          <p className="text-xs text-muted-foreground">職種を選んで事例を絞り込む</p>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {category.tree.map((node) => (
          <TreeBranch
            key={node.label}
            node={node}
            depth={0}
            selectedLeaf={selectedLeaf}
            onLeafSelect={onLeafSelect}
          />
        ))}
      </div>

      {selectedLeaf && (
        <button
          type="button"
          onClick={() => onLeafSelect(null)}
          className="mt-4 w-full rounded-lg border border-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          「{selectedLeaf}」の絞り込みを解除
        </button>
      )}
    </section>
  )
}
