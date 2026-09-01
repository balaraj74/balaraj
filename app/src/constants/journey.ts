import { TIMELINE_ITEMS, TimelineItem } from './timeline';

/**
 * A single milestone positioned along the 3D road.
 * Derived from the shared TIMELINE_ITEMS so there is one source of truth
 * for the engineering-journey content.
 */
export interface JourneyStop extends TimelineItem {
  /** Distance down the road (world Z, negative = further away). */
  z: number;
  /** Which side of the road the building sits on. */
  side: 'left' | 'right';
  /** Primary neon hex colour for emissive materials + HUD accents. */
  hex: string;
  /** Relative height of the roadside building (varies the skyline). */
  height: number;
}

/**
 * Maps each timeline category to a neon hex that matches the existing
 * cyan / blue / emerald / amber / red theme tokens.
 */
const CATEGORY_HEX: Record<string, string> = {
  'Flagship Project': '#38bdf8', // sky blue
  Hackathon: '#ef4444', // red
  Scale: '#06b6d4', // cyan
  Architecture: '#f59e0b', // amber
  Systems: '#10b981', // emerald
  Foundation: '#3b82f6', // blue
};

/** Fallback ordered palette in case a new category is added. */
const FALLBACK_HEX = ['#06b6d4', '#3b82f6', '#38bdf8', '#10b981', '#f59e0b', '#ef4444'];

/** Spacing between consecutive milestones in world units. */
export const STOP_SPACING = 60;
/** Empty runway before the first building and after the last one. */
export const ROAD_PADDING = 50;

/**
 * Travel chronologically: oldest milestone first so the viewer drives
 * forward from "Foundation" toward the present-day "Flagship" work.
 * TIMELINE_ITEMS is authored newest-first, so we reverse it here.
 */
export const JOURNEY_STOPS: JourneyStop[] = [...TIMELINE_ITEMS]
  .reverse()
  .map((item, i) => ({
    ...item,
    z: -(ROAD_PADDING + i * STOP_SPACING),
    side: i % 2 === 0 ? 'left' : 'right',
    hex: CATEGORY_HEX[item.category] ?? FALLBACK_HEX[i % FALLBACK_HEX.length],
    // Deterministic but varied building heights for a believable skyline.
    height: 18 + ((i * 7) % 4) * 4,
  }));

/** Total length of the drivable road. */
export const ROAD_LENGTH =
  ROAD_PADDING * 2 + (JOURNEY_STOPS.length - 1) * STOP_SPACING;

/** Z of the very end of the journey (most negative). */
export const ROAD_END_Z = -(ROAD_PADDING + (JOURNEY_STOPS.length - 1) * STOP_SPACING);
