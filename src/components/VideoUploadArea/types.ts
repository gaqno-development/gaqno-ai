export interface VideoUploadAreaProps {
  onFileSelect: (file: File) => void;
  selectedFile?: File | null;
  onRemove: () => void;
  className?: string;
}
