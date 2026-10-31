import {
  BedDouble,
  Baby,
  Clock,
  CookingPot,
  DoorOpen,
  HeartHandshake,
  House,
  Sparkles,
  type LucideProps,
} from "lucide-react";
import type { Service } from "@/lib/services";

const serviceIcons: Record<Service["icon"], React.ComponentType<LucideProps>> = {
  home: House,
  bed: BedDouble,
  door: DoorOpen,
  baby: Baby,
  cook: CookingPot,
  elder: HeartHandshake,
  sparkles: Sparkles,
  clock: Clock,
};

export function ServiceIcon({ name, size = 22 }: { name: Service["icon"]; size?: number }) {
  const Icon = serviceIcons[name];
  return <Icon size={size} strokeWidth={1.75} aria-hidden />;
}
