export interface BlueprintCardProps {
  content: string;
  isEditing: boolean;
  onSave: (content: string) => void;
}
