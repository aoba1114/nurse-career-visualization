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

export interface CareerCase {
  id: string
  name: string
  age: number
  photo: string
  category: CategoryId
  /** ツリー上の所属（検索・パンくず用） */
  path: string[]
  yearsAsNurse: number
  originHospital: string
  currentRole: string
  currentCompany: string
  summary: string
  // --- フィルター用の構造化データ ---
  salary: number // 単位: 万円 (年収)
  region: string
  workStyle: string
  nightShift: boolean
  remote: boolean
  qualifications: string[]
  // --- 詳細ページ用 ---
  timeline: TimelineStep[]
  skills: string[]
  transferReason: string
  dailyWork: string[]
  difficulty: number // 1-5 (転職難易度)
  recommendation: number // 1-5 (おすすめ度)
  tags: string[]
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

export const cases: CareerCase[] = [
  {
    id: 'misaki',
    name: '田中 美咲',
    age: 29,
    photo: '/portraits/misaki.png',
    category: 'company',
    path: ['一般企業', '医療コンサル', 'EY'],
    yearsAsNurse: 6,
    originHospital: '国立大学病院',
    currentRole: '医療コンサルタント',
    currentCompany: 'EY（EY Global Public Services）',
    summary: 'ICUでの臨床経験を武器に、医療政策・ヘルスケア領域のコンサルへ転身。',
    salary: 750,
    region: '東京',
    workStyle: '会社員（正社員）',
    nightShift: false,
    remote: true,
    qualifications: ['看護師', 'TOEIC 850'],
    timeline: [
      { label: '看護学生', detail: '国立大学 看護学部', period: '〜2015' },
      { label: '大学病院に入職', detail: '循環器内科病棟', period: '2015' },
      { label: 'ICUへ異動', detail: '集中治療の経験を積む', period: '2017 - 2020（3年）' },
      { label: '医療コンサルへ転職', detail: 'EY GPS ヘルスケアチーム', period: '2021' },
      { label: '現在', detail: 'マネージャー候補として活躍', current: true },
    ],
    skills: ['論理的思考', '英語（ビジネス）', 'データ分析', 'プレゼンテーション'],
    transferReason:
      '目の前の患者だけでなく、医療制度そのものを良くしたいと考え、政策に関われるコンサルを志望しました。',
    dailyWork: [
      '官公庁・病院向けのプロジェクトMTG',
      '医療データの分析と資料作成',
      'クライアントへの提案・報告',
      '若手メンバーのマネジメント',
    ],
    difficulty: 5,
    recommendation: 4,
    tags: ['ICU', 'EY', 'コンサル', '東京', 'リモート可'],
  },
  {
    id: 'hina',
    name: '佐藤 陽菜',
    age: 34,
    photo: '/portraits/hina.png',
    category: 'company',
    path: ['一般企業', '製薬会社', 'MSL（メディカル）'],
    yearsAsNurse: 8,
    originHospital: '市中総合病院',
    currentRole: 'メディカルサイエンスリエゾン（MSL）',
    currentCompany: '外資系製薬会社',
    summary: '病棟での服薬指導の経験から、製薬企業のメディカル職へキャリアチェンジ。',
    salary: 850,
    region: '大阪',
    workStyle: '会社員（正社員）',
    nightShift: false,
    remote: true,
    qualifications: ['看護師', 'がん化学療法看護 認定'],
    timeline: [
      { label: '看護学生', detail: '看護専門学校', period: '〜2013' },
      { label: '総合病院に入職', detail: '血液内科・腫瘍内科', period: '2013' },
      { label: '認定看護師を取得', detail: 'がん化学療法看護', period: '2018' },
      { label: '製薬会社へ転職', detail: 'MSLとして専門医と連携', period: '2021' },
      { label: '現在', detail: 'オンコロジー領域を担当', current: true },
    ],
    skills: ['薬理学の知識', '英語論文の読解', '医師との関係構築', 'プレゼン'],
    transferReason:
      '最新の治療やエビデンスをより多くの医療者に届けたいと思い、専門性を活かせるMSLを選びました。',
    dailyWork: [
      '専門医（KOL）との面談',
      '最新の臨床エビデンスの収集',
      '社内向け勉強会の実施',
      '学会・講演会への参加',
    ],
    difficulty: 4,
    recommendation: 5,
    tags: ['製薬', 'MSL', '認定看護師', '大阪', 'オンコロジー'],
  },
  {
    id: 'kenta',
    name: '鈴木 健太',
    age: 31,
    photo: '/portraits/kenta.png',
    category: 'company',
    path: ['一般企業', '医療機器メーカー', '臨床スペシャリスト'],
    yearsAsNurse: 7,
    originHospital: '救命救急センター',
    currentRole: '臨床スペシャリスト',
    currentCompany: '外資系医療機器メーカー',
    summary: '救急での機器操作の知識を活かし、医療機器メーカーの臨床サポート職へ。',
    salary: 700,
    region: '東京',
    workStyle: '会社員（正社員）',
    nightShift: false,
    remote: false,
    qualifications: ['看護師', '救急看護 経験7年'],
    timeline: [
      { label: '看護学生', detail: '看護大学', period: '〜2014' },
      { label: '救命救急センターに入職', detail: '三次救急', period: '2014 - 2021（7年）' },
      { label: '医療機器メーカーへ転職', detail: '循環器デバイス担当', period: '2021' },
      { label: '現在', detail: '手術室での立ち会い・教育', current: true },
    ],
    skills: ['医療機器の専門知識', '手技サポート', 'コミュニケーション', '英語'],
    transferReason:
      '救急で使っていた機器の「作り手側」に興味を持ち、医療者と企業をつなぐ仕事に挑戦しました。',
    dailyWork: [
      '手術室での製品立ち会い',
      '医師・看護師への使用方法トレーニング',
      '病院への訪問サポート',
      '営業チームとの連携',
    ],
    difficulty: 3,
    recommendation: 4,
    tags: ['救急', '医療機器', '東京', '循環器'],
  },
  {
    id: 'mei',
    name: '山本 芽衣',
    age: 27,
    photo: '/portraits/mei.png',
    category: 'midwife',
    path: ['助産師', '病院・クリニック', '産科病棟'],
    yearsAsNurse: 4,
    originHospital: '総合周産期母子医療センター',
    currentRole: '助産師',
    currentCompany: '総合病院 産科病棟',
    summary: '看護師として働きながら助産師学校へ進学し、お産に関わる仕事を実現。',
    salary: 520,
    region: '神奈川',
    workStyle: '病院勤務（交代制）',
    nightShift: true,
    remote: false,
    qualifications: ['看護師', '助産師', 'アドバンス助産師'],
    timeline: [
      { label: '看護学生', detail: '看護大学', period: '〜2019' },
      { label: '総合病院に入職', detail: '産婦人科病棟', period: '2019' },
      { label: '助産師学校へ進学', detail: '働きながら受験・入学', period: '2021' },
      { label: '助産師として復帰', detail: '分娩介助を担当', period: '2022' },
      { label: '現在', detail: '年間100件以上の分娩に関わる', current: true },
    ],
    skills: ['分娩介助', '妊婦・褥婦ケア', '新生児ケア', '保健指導'],
    transferReason:
      '学生時代の実習でお産に立ち会い、「生命の誕生」に寄り添う仕事がしたいと強く思いました。',
    dailyWork: [
      '妊婦健診・保健指導',
      '分娩の介助',
      '産後のお母さんと赤ちゃんのケア',
      '母乳外来の対応',
    ],
    difficulty: 3,
    recommendation: 5,
    tags: ['助産師', '産科', '神奈川', '夜勤あり'],
  },
  {
    id: 'shiori',
    name: '中村 詩織',
    age: 36,
    photo: '/portraits/shiori.png',
    category: 'government',
    path: ['行政・保健所', '保健師', '行政保健師'],
    yearsAsNurse: 12,
    originHospital: '地域中核病院',
    currentRole: '行政保健師',
    currentCompany: '市役所 健康福祉部',
    summary: '病棟看護師から保健師資格を取得し、地域全体の健康づくりを担う公務員に。',
    salary: 560,
    region: '福岡',
    workStyle: '地方公務員',
    nightShift: false,
    remote: false,
    qualifications: ['看護師', '保健師'],
    timeline: [
      { label: '看護学生', detail: '看護大学（保健師課程）', period: '〜2011' },
      { label: '地域病院に入職', detail: '内科・地域包括ケア病棟', period: '2011 - 2019' },
      { label: '市役所に入職', detail: '保健師採用試験に合格', period: '2019' },
      { label: '現在', detail: '母子保健・成人保健を担当', current: true },
    ],
    skills: ['地域アセスメント', '健康教育', '関係機関との調整', '事業企画'],
    transferReason:
      '病気になる前の「予防」に関わりたいと考え、地域の人々を広く支える保健師を選びました。',
    dailyWork: [
      '乳幼児健診・家庭訪問',
      '健康相談・保健指導',
      '健康づくり事業の企画運営',
      '関係機関との連携会議',
    ],
    difficulty: 3,
    recommendation: 4,
    tags: ['保健師', '行政', '公務員', '福岡', '夜勤なし'],
  },
  {
    id: 'ryo',
    name: '高橋 亮',
    age: 33,
    photo: '/portraits/ryo.png',
    category: 'educator',
    path: ['教員・研究者', '研究者', '大学研究職'],
    yearsAsNurse: 9,
    originHospital: '大学病院',
    currentRole: '助教（看護学）',
    currentCompany: '国立大学 医学部看護学科',
    summary: '大学院で修士・博士を取得し、臨床経験を活かした看護研究と教育に従事。',
    salary: 620,
    region: '愛知',
    workStyle: '大学教員（研究職）',
    nightShift: false,
    remote: true,
    qualifications: ['看護師', '修士（看護学）', '博士（看護学）'],
    timeline: [
      { label: '看護学生', detail: '看護大学', period: '〜2013' },
      { label: '大学病院に入職', detail: '外科・ICU', period: '2013 - 2018' },
      { label: '大学院 修士課程', detail: '看護学専攻', period: '2018 - 2020' },
      { label: '博士課程 / 助教', detail: '研究と教育を並行', period: '2020 - 2024' },
      { label: '現在', detail: '看護研究と学生指導', current: true },
    ],
    skills: ['研究デザイン', '統計解析', '論文執筆', '教育・指導'],
    transferReason:
      '臨床で感じた疑問をエビデンスとして解明し、看護の質そのものを高めたいと思いました。',
    dailyWork: [
      '講義・演習・実習指導',
      '研究データの収集と分析',
      '論文・学会発表の準備',
      '学生の卒業研究サポート',
    ],
    difficulty: 5,
    recommendation: 4,
    tags: ['大学院', '研究', '教員', '愛知', 'リモート可'],
  },
  {
    id: 'sakura',
    name: '伊藤 さくら',
    age: 30,
    photo: '/portraits/sakura.png',
    category: 'overseas',
    path: ['海外', '海外正看護師', 'オーストラリア'],
    yearsAsNurse: 6,
    originHospital: '私立総合病院',
    currentRole: 'Registered Nurse（正看護師）',
    currentCompany: 'オーストラリア 州立病院',
    summary: '国内で経験を積んだ後、語学とライセンスを取得し海外の看護師として就労。',
    salary: 800,
    region: '海外（オーストラリア）',
    workStyle: '海外就労（交代制）',
    nightShift: true,
    remote: false,
    qualifications: ['看護師', 'IELTS 7.0', 'AHPRA登録'],
    timeline: [
      { label: '看護学生', detail: '看護専門学校', period: '〜2015' },
      { label: '総合病院に入職', detail: '消化器外科病棟', period: '2015 - 2020' },
      { label: '語学留学 / 資格取得', detail: 'IELTS・現地登録の準備', period: '2020 - 2022' },
      { label: '現地病院に就職', detail: '州立病院の一般病棟', period: '2022' },
      { label: '現在', detail: '多国籍チームで勤務', current: true },
    ],
    skills: ['英語（医療）', '異文化コミュニケーション', 'クリティカルシンキング', '自立性'],
    transferReason:
      '海外の看護の考え方を学びたい、ワークライフバランスの良い環境で働きたいと思いました。',
    dailyWork: [
      '担当患者のアセスメント',
      '多職種チームとの連携',
      '英語での記録・申し送り',
      '患者・家族への説明',
    ],
    difficulty: 5,
    recommendation: 4,
    tags: ['海外', 'オーストラリア', '英語', '夜勤あり'],
  },
  {
    id: 'naoki',
    name: '小林 直樹',
    age: 35,
    photo: '/portraits/naoki.png',
    category: 'startup',
    path: ['起業・フリーランス', '起業', 'ヘルスケアスタートアップ'],
    yearsAsNurse: 10,
    originHospital: '大学病院',
    currentRole: '代表取締役 / 看護師',
    currentCompany: '自社（ヘルスケアスタートアップ）',
    summary: 'ICU看護師として働いた経験をもとに、看護師向けの支援サービスを起業。',
    salary: 900,
    region: '東京',
    workStyle: '経営者 / フリーランス',
    nightShift: false,
    remote: true,
    qualifications: ['看護師', '特定行為研修 修了'],
    timeline: [
      { label: '看護学生', detail: '看護大学', period: '〜2012' },
      { label: '大学病院に入職', detail: 'ICU / 救急', period: '2012 - 2020' },
      { label: '副業で情報発信', detail: '看護師向けメディア運営', period: '2019' },
      { label: '起業', detail: 'ヘルスケアスタートアップを創業', period: '2021' },
      { label: '現在', detail: '事業拡大とチーム作り', current: true },
    ],
    skills: ['事業企画', 'マーケティング', '資金調達', 'チームマネジメント'],
    transferReason:
      '現場の課題を根本から解決するには、自分でサービスを作るしかないと考え起業しました。',
    dailyWork: [
      'サービスの企画・改善',
      '投資家・パートナーとの商談',
      'メンバーのマネジメント',
      'SNS・メディアでの発信',
    ],
    difficulty: 5,
    recommendation: 3,
    tags: ['起業', 'フリーランス', 'ICU', '東京', 'リモート可'],
  },
  {
    id: 'mika',
    name: '佐藤 美香',
    age: 30,
    photo: '/portraits/mika.png',
    category: 'company',
    path: ['一般企業', '医療機器メーカー', '臨床スペシャリスト'],
    yearsAsNurse: 6,
    originHospital: '総合病院',
    currentRole: 'クリニカルスペシャリスト',
    currentCompany: '医療機器メーカー',
    summary: '急性期病院での経験を活かし、医療機器の導入支援や医療従事者へのトレーニングを担当しています。',
    salary: 720,
    region: '東京',
    workStyle: '企業勤務',
    nightShift: false,
    remote: true,
    qualifications: ['看護師'],
    timeline: [
      { label: '看護学生', detail: '看護大学卒業', period: '〜2018' },
      { label: '総合病院に入職', detail: '循環器内科', period: '2018 - 2022' },
      { label: 'ICUへ異動', detail: '重症患者の看護を担当', period: '2022 - 2024' },
      { label: '医療機器メーカーへ転職', detail: 'クリニカルスペシャリスト', period: '2024 - 現在', current: true },
    ],
    skills: [
      'プレゼンテーション',
      '医療機器操作',
      'コミュニケーション',
      '教育・研修',
      '営業同行'
    ],
    transferReason:
      '臨床で培った知識をより多くの医療現場に広げたいと思い、企業への転職を決意しました。夜勤のない働き方も魅力でした。',
    dailyWork: [
      '医療機器の導入サポート',
      '病院スタッフへの操作説明',
      '営業担当との同行訪問',
      '学会・展示会での製品説明',
      '問い合わせ対応'
    ],
    difficulty: 3,
    recommendation: 5,
    tags: [
      '企業',
      '医療機器メーカー',
      '夜勤なし',
      'リモート可',
      '東京'
    ],
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

/** ツリーを平坦化してラベル一覧を得る（検索用） */
export function flattenTree(nodes: TreeNode[]): string[] {
  return nodes.flatMap((n) => [n.label, ...(n.children ? flattenTree(n.children) : [])])
}
