import { cases, type CareerCase } from './career-data'

export interface CaseFilters {
  years: string
  salary: string
  region: string
  workStyle: string
  nightShift: string
  remote: string
  qualification: string
}

export const defaultFilters: CaseFilters = {
  years: 'all',
  salary: 'all',
  region: 'all',
  workStyle: 'all',
  nightShift: 'all',
  remote: 'all',
  qualification: 'all',
}

export interface FilterOption {
  value: string
  label: string
}

export interface FilterGroup {
  key: keyof CaseFilters
  label: string
  options: FilterOption[]
}

const uniq = (arr: string[]) => Array.from(new Set(arr))

export const filterGroups: FilterGroup[] = [
  {
    key: 'years',
    label: '看護師歴',
    options: [
      { value: 'all', label: 'すべて' },
      { value: '1-3', label: '1〜3年' },
      { value: '4-7', label: '4〜7年' },
      { value: '8+', label: '8年以上' },
    ],
  },
  {
    key: 'salary',
    label: '年収',
    options: [
      { value: 'all', label: 'すべて' },
      { value: '-600', label: '〜600万円' },
      { value: '600-800', label: '600〜800万円' },
      { value: '800+', label: '800万円以上' },
    ],
  },
  {
    key: 'region',
    label: '地域',
    options: [
      { value: 'all', label: 'すべて' },
      ...uniq(cases.map((c) => c.region)).map((r) => ({ value: r, label: r })),
    ],
  },
  {
    key: 'workStyle',
    label: '働き方',
    options: [
      { value: 'all', label: 'すべて' },
      ...uniq(cases.map((c) => c.workStyle)).map((w) => ({ value: w, label: w })),
    ],
  },
  {
    key: 'nightShift',
    label: '夜勤',
    options: [
      { value: 'all', label: 'すべて' },
      { value: 'no', label: '夜勤なし' },
      { value: 'yes', label: '夜勤あり' },
    ],
  },
  {
    key: 'remote',
    label: 'リモート',
    options: [
      { value: 'all', label: 'すべて' },
      { value: 'yes', label: 'リモート可' },
      { value: 'no', label: '出社中心' },
    ],
  },
  {
    key: 'qualification',
    label: '資格',
    options: [
      { value: 'all', label: 'すべて' },
      ...uniq(cases.flatMap((c) => c.qualifications ?? [])).map((q) => ({ value: q, label: q })),
    ],
  },
]

export function applyFilters(
  list: CareerCase[],
  filters: CaseFilters,
  query: string,
): CareerCase[] {
  const q = query.trim().toLowerCase()
  return list.filter((c) => {
    // --- 看護師歴 ---
    if (filters.years === '1-3' && !(c.yearsAsNurse >= 1 && c.yearsAsNurse <= 3)) return false
    if (filters.years === '4-7' && !(c.yearsAsNurse >= 4 && c.yearsAsNurse <= 7)) return false
    if (filters.years === '8+' && c.yearsAsNurse < 8) return false
    // --- 年収 ---
    if (filters.salary === '-600' && c.salary > 600) return false
    if (filters.salary === '600-800' && !(c.salary >= 600 && c.salary < 800)) return false
    if (filters.salary === '800+' && c.salary < 800) return false
    // --- 地域 / 働き方 ---
    if (filters.region !== 'all' && c.region !== filters.region) return false
    if (filters.workStyle !== 'all' && c.workStyle !== filters.workStyle) return false
    // --- 夜勤 / リモート ---
    if (filters.nightShift === 'yes' && !c.nightShift) return false
    if (filters.nightShift === 'no' && c.nightShift) return false
    if (filters.remote === 'yes' && !c.remote) return false
    if (filters.remote === 'no' && c.remote) return false
    // --- 資格 ---
    if (filters.qualification !== 'all' && !c.qualifications.includes(filters.qualification))
      return false
    // --- キーワード検索 ---
    if (q) {
      const haystack = [
        c.name,
        c.currentRole,
        c.currentCompany,
        c.originHospital,
        c.summary,
        c.region,
        ...c.path,
        ...(c.tags ?? []),
        ...c.qualifications,
        ...(c.skills ?? []),
      ]
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })
}

export function countActiveFilters(filters: CaseFilters): number {
  return Object.values(filters).filter((v) => v !== 'all').length
}
