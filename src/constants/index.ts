import type { TextImageProperties } from '../utils/textToDataUrl';

export const niceBlue = '#1a62ff';

export const defaultTextProperties = {
  backgroundColor: niceBlue,
  borderRadius: 32,
  color: 'white',
  fontFamily: 'Rubik, sans-serif',
  fontSize: '1rem',
  paddingHorizontal: 8,
  paddingVertical: 4,
} as const satisfies TextImageProperties;

export const optionsFields: Readonly<
  {
    id: string;
    label: string;
    type: 'string' | 'number';
  }[]
> = [
  { id: 'backgroundColor', label: 'Background color', type: 'string' },
  { id: 'borderRadius', label: 'Border radius', type: 'number' },
  { id: 'color', label: 'Color', type: 'string' },
  { id: 'fontFamily', label: 'Font family', type: 'string' },
  { id: 'fontSize', label: 'Font size', type: 'string' },
  { id: 'fontWeight', label: 'Font weight', type: 'string' },
  { id: 'padding', label: 'Padding', type: 'number' },
  { id: 'paddingHorizontal', label: 'Padding (horizontal)', type: 'number' },
  { id: 'paddingVertical', label: 'Padding (vertical)', type: 'number' },
  { id: 'strokeColor', label: 'Stroke color', type: 'string' },
  { id: 'strokeWidth', label: 'Stroke width', type: 'number' },
] as const;
