import { ArrowRight, Building2, MapPin } from 'lucide-react'
import Link from 'next/link'
import type { CareerCase } from '@/lib/career-data'
import { getCategory } from '@/lib/career-data'
import { CategoryIcon } from '@/components/category-icon'

export function CaseCard({ data }: { data: CareerCase }) {
  const category = getCategory(data.category)

  return (
    <Link
      href={`/cases/${data.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex items-start gap-4 p-5">
        <img
          src={data.photo || '/placeholder-user.jpg'}
          alt={`${data.name}さんの顔写真`}
          className="size-16 shrink-0 rounded-full border border-border object-cover"
          crossOrigin="anonymous"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold text-foreground">{data.name}</h3>
              <span className="shrink-0 text-xs text-muted-foreground">
                {data.age}歳{data.gender && `・${data.gender}`}
              </span>
          </div>
          <p className="mt-0.5 truncate text-sm font-medium text-primary">
            {data.currentRole}
          </p>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
            {category ? <CategoryIcon name={category.icon} className="size-3" /> : null}
            {category?.label}
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-2.5 px-5 pb-4">
        {data.summary && (
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {data.summary}
          </p>
        )}
        <dl className="space-y-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Building2 className="size-3.5 shrink-0" />
            <dt className="sr-only">現在の勤務先</dt>
            <dd className="truncate">{data.currentCompany}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0" />
            <dt className="sr-only">地域</dt>
            <dd>
              {data.region}・看護師歴 {data.yearsAsNurse}年・出身 {data.originHospital}
            </dd>
          </div>
        </dl>
      </div>

      <div className="flex items-center justify-between border-t border-border px-5 py-3">
        <span className="text-xs text-muted-foreground">
          想定年収{' '}
          <span className="font-semibold text-foreground">
            {data.salaryDisplay ?? `${data.salary}万円`}
          </span>
        </span>
        <span className="inline-flex items-center gap-1 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          詳細を見る
          <ArrowRight className="size-3.5" />
        </span>
      </div>
    </Link>
  )
}
