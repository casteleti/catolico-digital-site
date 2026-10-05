import { Bell, BookOpen, CalendarRange, Church, Clock3, Flame, Globe, HandHeart, HeartHandshake, Image as ImageIcon, Inbox, MapPin, Megaphone, Newspaper, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  clock: Clock3,
  heart: HeartHandshake,
  book: BookOpen,
  church: Church,
  users: Users,
  map: MapPin,
  bell: Bell,
  newspaper: Newspaper,
  image: ImageIcon,
  "hand-heart": HandHeart,
  shield: ShieldCheck,
  globe: Globe,
  inbox: Inbox,
  megaphone: Megaphone,
  "calendar-range": CalendarRange,
  flame: Flame,
};

export function ModuleIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = ICONS[name] ?? Church;
  return <Icon aria-hidden="true" size={size} strokeWidth={1.7} />;
}
