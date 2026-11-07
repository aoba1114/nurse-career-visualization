import type { AvatarOptions } from '@/lib/career-data'

const defaultAvatar: Required<AvatarOptions> = {
  hairStyle: 'short',
  hairColor: '#655B70',
  skinColor: '#F2C9B8',
  clothingColor: '#91B9CF',
  backgroundColor: '#E9E5F4',
  glasses: false,
}

export function CaseAvatar({
  avatar,
  className,
  label = '人物イラスト',
}: {
  avatar?: AvatarOptions
  className?: string
  label?: string
}) {
  const options = { ...defaultAvatar, ...avatar }
  const { hairStyle, hairColor, skinColor, clothingColor, backgroundColor, glasses } =
    options

  return (
    <svg
      viewBox="0 0 128 128"
      className={className}
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="128" height="128" fill={backgroundColor} />
      <path
        d="M17 128c2-20 15-31 31-35h32c16 4 29 15 31 35H17Z"
        fill={clothingColor}
      />
      <path d="M50 87h28v18c-5 7-23 7-28 0V87Z" fill={skinColor} />
      {hairStyle === 'long' && (
        <path d="M35 48c0-22 12-34 29-34s29 12 29 34v44c-8 7-15 9-21 7l-4-29H60l-4 29c-6 2-13 0-21-7V48Z" fill={hairColor} />
      )}
      {hairStyle === 'bob' && (
        <path d="M34 47c0-22 12-34 30-34s30 12 30 34v39c-7 8-14 11-22 9l-3-31H59l-3 31c-8 2-15-1-22-9V47Z" fill={hairColor} />
      )}
      {hairStyle === 'tied' && (
        <>
          <circle cx="64" cy="17" r="13" fill={hairColor} />
          <path d="M38 43c0-20 10-30 26-30s26 10 26 30v28H38V43Z" fill={hairColor} />
        </>
      )}
      {hairStyle === 'short' && (
        <path d="M36 47c0-22 11-34 28-34s28 12 28 34v13H36V47Z" fill={hairColor} />
      )}
      {hairStyle === 'shaved' && (
        <path d="M38 46c1-21 11-31 26-31s25 10 26 31c-8-7-17-10-26-10s-18 3-26 10Z" fill={hairColor} />
      )}
      <ellipse cx="64" cy="58" rx="25" ry="31" fill={skinColor} />
      <path
        d={
          hairStyle === 'bob'
            ? 'M39 48c3-18 12-27 25-27s22 9 25 27c-7-7-15-10-25-10s-18 3-25 10Z'
            : hairStyle === 'long'
              ? 'M39 48c3-18 12-27 25-27s22 9 25 27c-7-7-15-10-25-10s-18 3-25 10Z'
              : hairStyle === 'tied'
                ? 'M40 46c2-18 10-27 24-27s22 9 24 27c-7-7-14-10-24-10s-17 3-24 10Z'
                : hairStyle === 'shaved'
                  ? 'M40 41c4-14 12-21 24-21s20 7 24 21c-8-5-16-7-24-7s-16 2-24 7Z'
                  : 'M39 48c3-18 12-27 25-27s22 9 25 27c-7-7-15-10-25-10s-18 3-25 10Z'
        }
        fill={hairColor}
      />
      <path d="M52 59h1M75 59h1" stroke="#514B54" strokeLinecap="round" strokeWidth="3" />
      <path d="M64 61v7" stroke="#D59F91" strokeLinecap="round" strokeWidth="2" />
      <path d="M58 74c3 3 9 3 12 0" fill="none" stroke="#B97678" strokeLinecap="round" strokeWidth="2" />
      {glasses && (
        <g fill="none" stroke="#65717C" strokeWidth="2">
          <rect x="45" y="52" width="17" height="14" rx="5" />
          <rect x="66" y="52" width="17" height="14" rx="5" />
          <path d="M62 57h4M45 57l-4-2M83 57l4-2" />
        </g>
      )}
      <path d="M48 98c5 7 10 11 16 11s11-4 16-11l-5-5H53l-5 5Z" fill={backgroundColor} opacity=".9" />
    </svg>
  )
}
