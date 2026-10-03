import {Text} from '@sanity/ui'
import type {StringInputProps, TextInputProps} from 'sanity'

/**
 * Champ texte avec compteur de caractères sous le champ.
 * La limite est lue dans options.maxLength du champ.
 */
export function CharCountInput(props: StringInputProps | TextInputProps) {
  const max = (props.schemaType.options as {maxLength?: number} | undefined)?.maxLength
  const length = (props.value || '').length
  const over = max ? length > max : false
  return (
    <div style={{display: 'grid', gap: '0.5rem'}}>
      {props.renderDefault(props)}
      <Text size={1} muted={!over} style={over ? {color: '#b3261e'} : undefined}>
        {length} caractère{length > 1 ? 's' : ''}
        {max ? ` sur ${max} conseillés` : ''}
      </Text>
    </div>
  )
}
