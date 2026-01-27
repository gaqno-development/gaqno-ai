export interface AISuggestionPopoverProps {
  onGenerate: () => Promise<string>;
  onAccept: (suggestion: string) => void;
  trigger?: React.ReactNode;
  disabled?: boolean;
}
