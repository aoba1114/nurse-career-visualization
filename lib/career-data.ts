// ============================================================================
// データ層 : ここを編集するだけで職種・事例を追加できます。
// 将来的に Supabase 等へ差し替える場合も、同じ型 (Category / CareerCase) を
// 返す関数に置き換えるだけで UI 側は変更不要です。
// ============================================================================

export type CategoryId =
  | 'hospital'
  | 'company'
  | 'grad'
  | 'midwife'
  | 'overseas'
  | 'government'
  | 'startup'
  | 'educator'

/** lucide-react のアイコン名を文字列で保持（UI 側でマッピング） */
export type IconName =
  | 'hospital'
  | 'briefcase'
  | 'graduation-cap'
  | 'baby'
  | 'globe'
  | 'landmark'
  | 'rocket'
  | 'book-open'

export interface TreeNode {
  label: string
  children?: TreeNode[]
}

export interface Category {
  id: CategoryId
  emoji: string
  icon: IconName
  label: string
  description: string
  /** さらに細かい職種のツリー */
  tree: TreeNode[]
}

export interface TimelineStep {
  label: string
  detail?: string
  period?: string
  current?: boolean
}

export type AvatarHairStyle = 'short' | 'bob' | 'long' | 'tied' | 'shaved'

export interface AvatarOptions {
  hairStyle?: AvatarHairStyle
  hairColor?: string
  skinColor?: string
  clothingColor?: string
  backgroundColor?: string
  glasses?: boolean
}

export interface CareerCase {
  id: string
  name: string
  age: number
  gender?: string
  photo?: string
  avatar?: AvatarOptions
  category: CategoryId
  /** ツリー上の所属（検索・パンくず用） */
  path: string[]
  yearsAsNurse: number
  originHospital: string
  currentRole: string
  currentCompany: string
  summary?: string
  // --- フィルター用の構造化データ ---
  salary: number // 単位: 万円 (年収)
  salaryDisplay?: string
  region: string
  workStyle: string
  nightShift: boolean
  monthlyOvertime?: string
  remote: boolean
  qualifications: string[]
  // --- 詳細ページ用 ---
  timeline: TimelineStep[]
  skills?: string[]
  transferReason?: string
  careerPreparation?: string
  futureCareerPlan?: string
  dailyWork?: string[]
  difficulty?: number // 1-5 (転職難易度)
  recommendation?: number // 1-5 (おすすめ度)
  tags?: string[]
}

// ----------------------------------------------------------------------------
// カテゴリー & キャリアツリー
// ----------------------------------------------------------------------------

export const categories: Category[] = [
  {
    id: 'hospital',
    emoji: '🏥',
    icon: 'hospital',
    label: '病院勤務',
    description: '専門看護師・認定看護師など、臨床を極める道',
    tree: [
      {
        label: '急性期',
        children: [
          { label: 'ICU / 集中治療' },
          { label: '救命救急センター' },
          { label: '手術室（オペ看）' },
        ],
      },
      {
        label: '専門・認定',
        children: [
          { label: '専門看護師（CNS）' },
          { label: '認定看護師' },
          { label: '特定行為看護師' },
        ],
      },
      {
        label: '慢性期・その他',
        children: [{ label: '緩和ケア' }, { label: '訪問看護' }, { label: '外来' }],
      },
    ],
  },
  {
    id: 'company',
    emoji: '💼',
    icon: 'briefcase',
    label: '一般企業',
    description: 'コンサル・製薬・医療機器など、ビジネス領域へ',
    tree: [
      {
        label: '医療コンサル',
        children: [
          { label: 'EY' },
          { label: 'PwC' },
          { label: 'Deloitte' },
          { label: 'KPMG' },
        ],
      },
      {
        label: '製薬会社',
        children: [
          { label: 'MSL（メディカル）' },
          { label: '臨床開発（CRA）' },
          { label: 'MR' },
        ],
      },
      {
        label: '医療機器メーカー',
        children: [{ label: '臨床スペシャリスト' }, { label: '営業技術' }],
      },
      { label: 'IT / ヘルステック', children: [{ label: 'カスタマーサクセス' }, { label: 'PdM' }] },
      { label: '美容', children: [{ label: '美容クリニック' }, { label: '美容医療メーカー' }] },
      { label: '人材会社', children: [{ label: 'キャリアアドバイザー' }] },
    ],
  },
  {
    id: 'grad',
    emoji: '🎓',
    icon: 'graduation-cap',
    label: '大学院',
    description: '研究・高度専門職へ進むための学びの道',
    tree: [
      { label: '修士課程', children: [{ label: '看護学専攻' }, { label: '公衆衛生（MPH）' }] },
      { label: '博士課程', children: [{ label: '看護学研究' }] },
      { label: '専門看護師コース' },
    ],
  },
  {
    id: 'midwife',
    emoji: '👶',
    icon: 'baby',
    label: '助産師',
    description: '妊娠・出産・育児をサポートする専門職',
    tree: [
      { label: '病院・クリニック', children: [{ label: '産科病棟' }, { label: 'NICU' }] },
      { label: '助産院', children: [{ label: '開業助産師' }] },
      { label: '地域母子保健' },
    ],
  },
  {
    id: 'overseas',
    emoji: '🌍',
    icon: 'globe',
    label: '海外',
    description: '海外の医療現場や国際協力で活躍する道',
    tree: [
      { label: '海外正看護師', children: [{ label: 'オーストラリア' }, { label: 'アメリカ' }] },
      { label: '国際協力', children: [{ label: 'JICA' }, { label: 'NGO / MSF' }] },
      { label: '医療通訳・コーディネーター' },
    ],
  },
  {
    id: 'government',
    emoji: '🏛',
    icon: 'landmark',
    label: '行政・保健所',
    description: '公衆衛生・地域医療を支える公務員の道',
    tree: [
      { label: '保健師', children: [{ label: '行政保健師' }, { label: '産業保健師' }] },
      { label: '保健所 / 保健センター' },
      { label: '厚生労働省・自治体' },
    ],
  },
  {
    id: 'startup',
    emoji: '💻',
    icon: 'rocket',
    label: '起業・フリーランス',
    description: '自分の看護観をサービスや事業として形にする道',
    tree: [
      { label: '起業', children: [{ label: 'ヘルスケアスタートアップ' }, { label: '訪問看護ステーション' }] },
      { label: 'フリーランス', children: [{ label: '医療ライター' }, { label: 'セミナー講師' }] },
    ],
  },
  {
    id: 'educator',
    emoji: '📚',
    icon: 'book-open',
    label: '教員・研究者',
    description: '次世代の看護師を育て、看護学を発展させる道',
    tree: [
      { label: '看護教員', children: [{ label: '看護大学' }, { label: '看護専門学校' }] },
      { label: '研究者', children: [{ label: '大学研究職' }, { label: '研究機関' }] },
      { label: '実習指導者' },
    ],
  },
]

// ----------------------------------------------------------------------------
// キャリア事例
// ----------------------------------------------------------------------------

/**
 * 新しい事例のひな形
 * id は実名を使わず case-001 のような連番にし、追加時は番号を増やしてください。
 * 写真は任意です。省略した場合は /placeholder-user.jpg が表示されます。
 * 各項目の「ここに入力」を実際の内容に置き換えてください。
 *
 * {
 *   id: 'case-001',
 *   name: 'ここに入力',
 *   age: ここに入力,
 *   gender: 'ここに入力',
 *   photo: 'ここに入力',
 *   avatar: { hairStyle: 'short', hairColor: '#34313A', skinColor: '#F2C9B8', clothingColor: '#8FB8DD', backgroundColor: '#E9E5F4', glasses: false },
 *   category: 'ここに入力',
 *   path: ['ここに入力'],
 *   yearsAsNurse: ここに入力,
 *   originHospital: 'ここに入力',
 *   currentRole: 'ここに入力',
 *   currentCompany: 'ここに入力',
 *   summary: 'ここに入力',
 *   salary: ここに入力,
 *   salaryDisplay: 'ここに入力',
 *   region: 'ここに入力',
 *   workStyle: 'ここに入力',
 *   nightShift: ここに入力,
 *   monthlyOvertime: 'ここに入力',
 *   remote: ここに入力,
 *   qualifications: ['ここに入力'],
 *   timeline: [{ label: 'ここに入力', detail: 'ここに入力', period: 'ここに入力', current: true }],
 *   skills: ['ここに入力'],
 *   transferReason: 'ここに入力',
 *   careerPreparation: 'ここに入力',
 *   futureCareerPlan: 'ここに入力',
 *   dailyWork: ['ここに入力'],
 *   difficulty: ここに入力,
 *   recommendation: ここに入力,
 *   tags: ['ここに入力'],
 * }
 */
export const cases: CareerCase[] = [
  {
    id: 'case-001',
    name: 'Y.T',
    age: 29,
    gender: '男',
    avatar: {
      hairStyle: 'short',
      hairColor: '#34313A',
      glasses: false,
      clothingColor: '#8FB8DD',
    },
    category: 'startup',
    path: ['起業・フリーランス', 'フリーランス', 'IT'],
    yearsAsNurse: 6,
    originHospital: '慶應義塾大学病院',
    currentRole: 'IT',
    currentCompany: '自営業',
    salary: 1200,
    salaryDisplay: '1200万以上',
    region: '東京',
    workStyle: 'フリーランス',
    nightShift: false,
    monthlyOvertime: '31時間以上',
    remote: true,
    qualifications: ['看護師', '基本情報技術者'],
    timeline: [
      { label: '2015年 慶應義塾大学看護医療学部卒業' },
      { label: '2015〜2021年 慶應義塾大学病院勤務' },
      { label: '2021〜2023年 IT会社に勤める' },
      { label: '2023年〜 IT会社起業', current: true },
    ],
    careerPreparation: '基本情報技術者の資格を取った。転職サービスを使った。',
    futureCareerPlan: '子供に自由な生活をさせたい',
  },
]

// ----------------------------------------------------------------------------
// ヘルパー
// ----------------------------------------------------------------------------

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id)
}

export function getCasesByCategory(id: CategoryId) {
  return cases.filter((c) => c.category === id)
}

export function getRecommendedKeywords(limit = 6): string[] {
  const seen = new Set<string>()
  const keywords: string[] = []

  for (const careerCase of cases) {
    for (const keyword of [
      careerCase.currentRole,
      careerCase.currentCompany,
      ...(careerCase.tags ?? []),
    ]) {
      const normalized = keyword.trim()
      const key = normalized.toLocaleLowerCase()

      if (normalized && !seen.has(key)) {
        seen.add(key)
        keywords.push(normalized)
        if (keywords.length === limit) return keywords
      }
    }
  }

  return keywords
}

/** ツリーを平坦化してラベル一覧を得る（検索用） */
export function flattenTree(nodes: TreeNode[]): string[] {
  return nodes.flatMap((n) => [n.label, ...(n.children ? flattenTree(n.children) : [])])
}
