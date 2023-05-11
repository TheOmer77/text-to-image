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
