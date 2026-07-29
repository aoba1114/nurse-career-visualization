import {
  Baby,
  BookOpen,
  Briefcase,
  Globe,
  GraduationCap,
  Hospital,
  Landmark,
  Rocket,
  type LucideIcon,
} from 'lucide-react'
import type { IconName } from '@/lib/career-data'

const map: Record<IconName, LucideIcon> = {
  hospital: Hospital,
  briefcase: Briefcase,
  'graduation-cap': GraduationCap,
  baby: Baby,
  globe: Globe,
  landmark: Landmark,
  rocket: Rocket,
  'book-open': BookOpen,
}

export function CategoryIcon({
  name,
  className,
}: {
  name: IconName
  className?: string
}) {
  const Icon = map[name]
  return <Icon className={className} aria-hidden="true" />
}
