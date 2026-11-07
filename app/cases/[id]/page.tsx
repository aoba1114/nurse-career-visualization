import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { CaseDetail } from '@/components/case-detail'
import { cases } from '@/lib/career-data'

const baseUrl = 'https://www.nurse-canvas.com'

export function generateStaticParams() {
  return cases.map(({ id }) => ({ id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const careerCase = cases.find((item) => item.id === id)

  if (!careerCase) {
    return {
      title: '事例が見つかりません | 看護師のキャリア事例',
    }
  }

  return {
    title: `${careerCase.originHospital}から${careerCase.currentRole}へ | 看護師のキャリア事例`,
    description: careerCase.summary,
    alternates: {
      canonical: `${baseUrl}/cases/${careerCase.id}`,
    },
  }
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const careerCase = cases.find((item) => item.id === id)

  if (!careerCase) notFound()

  return (
    <main className="min-h-dvh bg-background">
      <div className="mx-auto max-w-3xl space-y-6 px-5 py-8 md:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          一覧に戻る
        </Link>
        <CaseDetail data={careerCase} />
      </div>
    </main>
  )
}
