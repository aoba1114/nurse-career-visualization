'use client'

import { useEffect } from 'react'
import {
  Award,
  Briefcase,
  Building2,
  Clock,
  MapPin,
  Sparkles,
  TrendingUp,
  Wallet,
  X,
} from 'lucide-react'
import type { CareerCase } from '@/lib/career-data'
import { getCategory } from '@/lib/career-data'
import { RatingMeter } from './rating-meter'
import { CategoryIcon } from '@/components/category-icon'

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
      {children}
    </span>
  )
}

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: typeof Wallet
  children: React.ReactNode
}) {
  return (
    <h4 className="mb-2.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
      <Icon className="size-4 text-primary" />
      {children}
    </h4>
  )
}

export function CaseDetailDialog({
  data,
  onClose,
}: {
  data: CareerCase | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!data) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [data, onClose])

  if (!data) return null
  const category = getCategory(data.category)

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-0 backdrop-blur-sm animate-in fade-in duration-200 sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${data.name}さんのキャリア詳細`}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-border bg-card shadow-xl animate-in slide-in-from-bottom-4 duration-300 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative flex items-start gap-4 border-b border-border p-5 md:p-6">
          <img
            src={data.photo || '/placeholder.svg'}
            alt={`${data.name}さんの顔写真`}
            className="size-20 shrink-0 rounded-2xl border border-border object-cover"
            crossOrigin="anonymous"
          />
          <div className="min-w-0 flex-1 pr-8">
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
              {category ? <CategoryIcon name={category.icon} className="size-3" /> : null}
              {category?.label}
            </span>
            <h3 className="mt-1.5 text-lg font-semibold text-foreground">
              {data.name}
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                {data.age}歳・看護師歴{data.yearsAsNurse}年
              </span>
            </h3>
            <p className="mt-0.5 text-sm font-medium text-primary">{data.currentRole}</p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Building2 className="size-3.5" />
              {data.currentCompany}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="閉じる"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 space-y-7 overflow-y-auto p-5 md:p-6">
          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-secondary/50 p-3">
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Wallet className="size-3.5" />
                年収
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">{data.salary}万円</p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/50 p-3">
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3.5" />
                地域
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">{data.region}</p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/50 p-3">
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Briefcase className="size-3.5" />
                働き方
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">{data.workStyle}</p>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <SectionTitle icon={Clock}>キャリアのタイムライン</SectionTitle>
            <ol className="relative ml-2 border-l-2 border-border">
              {data.timeline.map((step, i) => (
                <li key={i} className="relative pb-5 pl-6 last:pb-0">
                  <span
                    className={`absolute -left-[7px] top-1 size-3 rounded-full border-2 ${
                      step.current
                        ? 'border-primary bg-primary'
                        : 'border-border bg-card'
                    }`}
                  />
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <p
                      className={`text-sm font-semibold ${
                        step.current ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {step.label}
                    </p>
                    {step.period && (
                      <span className="text-xs text-muted-foreground">{step.period}</span>
                    )}
                  </div>
                  {step.detail && (
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {step.detail}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* Transfer reason */}
          <div>
            <SectionTitle icon={Sparkles}>この道を選んだ理由</SectionTitle>
            <p className="rounded-xl bg-accent/60 p-3.5 text-sm leading-relaxed text-foreground">
              {data.transferReason}
            </p>
          </div>

          {/* Daily work */}
          <div>
            <SectionTitle icon={Clock}>一日の仕事内容</SectionTitle>
            <ul className="space-y-1.5">
              {data.dailyWork.map((w, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {w}
                </li>
              ))}
            </ul>
          </div>

          {/* Qualifications & skills */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <SectionTitle icon={Award}>必要な資格</SectionTitle>
              <div className="flex flex-wrap gap-1.5">
                {data.qualifications.map((q) => (
                  <Tag key={q}>{q}</Tag>
                ))}
              </div>
            </div>
            <div>
              <SectionTitle icon={TrendingUp}>必要なスキル</SectionTitle>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>
          </div>

          {/* Ratings */}
          <div className="grid gap-5 rounded-xl border border-border p-4 sm:grid-cols-2">
            <RatingMeter label="転職難易度" value={data.difficulty} tone="muted" />
            <RatingMeter label="おすすめ度" value={data.recommendation} tone="primary" />
          </div>
        </div>
      </div>
    </div>
  )
}
