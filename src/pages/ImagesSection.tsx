import { lazy } from 'react';
import { FileText, Edit, Paintbrush } from 'lucide-react';
import { SectionWithSubNav } from '@/components/SectionWithSubNav';

const TextToImageTab = lazy(() => import('@/components/ImageCreationPanel/tabs/TextToImageTab').then((m) => ({ default: m.TextToImageTab })));
const EditImageTab = lazy(() => import('@/components/ImageCreationPanel/tabs/EditImageTab').then((m) => ({ default: m.EditImageTab })));
const InpaintingTab = lazy(() => import('@/components/ImageCreationPanel/tabs/InpaintingTab').then((m) => ({ default: m.InpaintingTab })));

const IMAGE_CHILDREN = [
  { segment: 'text', label: 'Texto para Imagem', href: '/ai/images/text', icon: FileText },
  { segment: 'edit', label: 'Editar Imagem', href: '/ai/images/edit', icon: Edit },
  { segment: 'inpainting', label: 'Inpainting', href: '/ai/images/inpainting', icon: Paintbrush },
];

const SEGMENT_TO_COMPONENT = {
  text: TextToImageTab,
  edit: EditImageTab,
  inpainting: InpaintingTab,
};

export default function ImagesSection() {
  return (
    <SectionWithSubNav
      basePath="/ai/images"
      defaultSegment="text"
      children={IMAGE_CHILDREN}
      segmentToComponent={SEGMENT_TO_COMPONENT}
      title="Imagens"
      variant="vertical"
    />
  );
}
