# Component-Hook Separation Pattern

Components must be **purely visual**. All state, logic, and helpers live in hooks.

## Structure

```
ComponentName/
├── ComponentName.tsx       # JSX only, handlers from hook
├── index.ts
├── types.ts                # Props and shared types
└── hooks/
    └── useComponentName.ts # useState, useForm, useCallback, etc.
```

## Examples in this app

| Component             | Hook                     | Notes                                      |
|----------------------|--------------------------|--------------------------------------------|
| VideoCreationPanel   | useVideoCreationPanel    | useForm, upload + generate, mode toggles   |
| AudioCreationPanel   | useAudioCreationPanel    | useForm, generate, audioUrl state          |
| ImageCreationPanel   | useImageCreationPanel    | useForm, Controller, generate, image state |
| PromptTextarea       | usePromptTextarea        | Dialog open state, PROMPT_EXAMPLES         |
| ReferenceInputs      | useReferenceInputs       | useMemo objectURL, useCallback file input  |
| VideoUploadArea      | useVideoUploadArea       | drag state, objectURL revoke, validation   |
| BlueprintContent     | useBlueprintContent      | isEditing, default structure, create/update|
| CoverDesigner        | useCoverDesigner         | title/author state, createCover            |
| AISuggestionPopover  | useAISuggestionPopover   | open, generating, suggestion, error        |
| BlueprintCard        | useBlueprintCard         | editedContent sync, handleSave/Cancel      |
| CharacterList        | useCharacterList         | dialog, form state, createCharacter, getRoleLabel |
| BlueprintStructure   | useBlueprintStructure    | SECTION_NAMES, SECTION_ORDER, groupedBySection, handleChapterClick, toggleSection |
| BlueprintContextPanel| useBlueprintContextPanel | totalWords, totalPages, localMinPages, handleSaveMinPages, formatPageInfo |
| BookStructureMap     | useBookStructureMap      | dialogs, form state, handleChapterClick, handleCreateChapter/Character |
| BookForm             | useBookForm              | bookFormSchema, useForm, selectedGenre/Style, handleGenreSelect, handleStyleSelect |
| ChapterEditor        | useChapterEditor         | parseSummary, sync effect, auto-generate effect, handleGenerateContent, pageInfo |
| CharacterEditor      | useCharacterEditor       | characterDetails, updateCharacterDetails, handleAnalyze, handleGenerateAvatar, handleSave |

## Rules

| In component        | In hook                      |
|--------------------|------------------------------|
| JSX, Tailwind      | useState, useForm, useEffect |
| onClick={handler}  | useCallback(handler, deps)   |
| —                  | useMemo, derived values      |
| —                  | Constants, helpers           |
