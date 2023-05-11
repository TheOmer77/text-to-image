export interface TextImageProperties {
  backgroundColor?: string;
  borderRadius?: number;
  color?: string;
  fontFamily?: string;
  fontSize?: number | string;
  fontWeight?: number | string;
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

const setCanvasFont = (
  ctx: CanvasRenderingContext2D,
  {
    fontFamily,
    fontSize,
    fontWeight,
  }: Pick<TextImageProperties, 'fontFamily' | 'fontSize' | 'fontWeight'> = {}
) => {
  ctx.font = [
    fontWeight,
    typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
    fontFamily,
  ].join(' ');
};

/**
 * Render text as an image.
 * @param text The text to render.
 * @param properties Properties for text style and image background.
 * @returns a data URL of the rendered image.
 */
const textToDataUrl = (
  text: string,
  {
    backgroundColor,
    borderRadius,
    color = '#000000',
    fontFamily,
    fontSize,
    fontWeight,
    padding = 0,
    paddingHorizontal,
    paddingVertical,
    strokeColor,
    strokeWidth,
  }: TextImageProperties = {}
) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return ''; // MAKE TS HAPPY

  // Set width and height according to text, font and padding
  setCanvasFont(ctx, { fontFamily, fontSize, fontWeight });
  const textMetrics = ctx.measureText(text);
  canvas.width = textMetrics.width + (paddingHorizontal || padding) * 2;
  canvas.height =
    textMetrics.fontBoundingBoxAscent +
    textMetrics.fontBoundingBoxDescent +
    (paddingVertical || padding) * 2;
  const textYPos = canvas.height / 2;

  // Render background
  if (backgroundColor) {
    if (borderRadius)
      ctx.roundRect(0, 0, canvas.width, canvas.height, borderRadius);
    else ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fill();
  }

  // Render text itself - for some reason the font needs to be redefined
  setCanvasFont(ctx, { fontFamily, fontSize, fontWeight });
  ctx.textBaseline = 'middle';
  if (strokeColor && strokeWidth) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.strokeText(text, paddingHorizontal || padding, textYPos);
  }
  ctx.fillStyle = color;
  ctx.fillText(text, paddingHorizontal || padding, textYPos);

  return canvas.toDataURL('image/png');
};

export default textToDataUrl;
