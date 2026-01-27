export interface ReferenceInputsProps {
  referenceImage?: File | null;
  onImageSelect: (file: File | null) => void;
  className?: string;
}
