import { OG_SIZE, ogImage } from '@/lib/og';
import { getProjectByRouteId } from '@/lib/seo';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Balaraj R AI project';

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectByRouteId(id);
  return ogImage({ eyebrow: 'AI Project', title: project?.displayTitle ?? 'AI Projects' });
}
