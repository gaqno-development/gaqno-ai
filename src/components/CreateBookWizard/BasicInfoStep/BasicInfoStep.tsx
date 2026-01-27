import { Input, Label, Textarea, Button } from '@gaqno-development/frontcore/components/ui'
import { GenreSelector } from '../../GenreSelector'
import { AISuggestionButton } from '../../AISuggestionButton'
import { useBasicInfoStep } from './hooks/useBasicInfoStep'
import type { IBasicInfoStepProps } from './types'
import { Sparkles, Loader2 } from 'lucide-react'

export function BasicInfoStep(props: IBasicInfoStepProps) {
  const {
    register,
    setValue,
    errors,
    isGeneratingTitle,
    isGeneratingPremise,
    isGeneratingAll,
    handleGenerateTitle,
    handleGeneratePremise,
    handleGenerateAll,
  } = useBasicInfoStep(props)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end pb-2 border-b">
        <Button
          type="button"
          onClick={handleGenerateAll}
          disabled={isGeneratingAll || isGeneratingTitle || isGeneratingPremise}
          variant="outline"
          className="gap-2"
        >
          {isGeneratingAll ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Gerar Tudo com IA
            </>
          )}
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="title">Título do Livro</Label>
          <AISuggestionButton
            onGenerate={handleGenerateTitle}
            onAccept={(suggestion) => setValue('title', suggestion)}
            disabled={isGeneratingTitle || isGeneratingAll}
          />
        </div>
        <Input
          id="title"
          placeholder="Ex: A Jornada do Herói"
          {...register('title', { required: 'Título é obrigatório' })}
          className={errors.title ? 'border-destructive' : ''}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message as string}</p>
        )}
      </div>

      <GenreSelector
        selectedGenre={props.selectedGenre}
        onGenreSelect={props.onGenreSelect}
      />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="description">Premissa / Sinopse Curta</Label>
          <AISuggestionButton
            onGenerate={handleGeneratePremise}
            onAccept={(suggestion) => setValue('description', suggestion)}
            disabled={isGeneratingPremise || isGeneratingAll}
          />
        </div>
        <Textarea
          id="description"
          placeholder="Descreva a ideia central do seu livro, os personagens principais, o conflito ou qualquer informação que ajude a criar o livro..."
          rows={6}
          {...register('description')}
        />
      </div>
    </div>
  )
}
