export function rgbToCmyk(r, g, b) {
  const c = 1 - r / 255;
  const m = 1 - g / 255;
  const y = 1 - b / 255;
  const k = Math.min(c, m, y);

  const cOut = (c - k) / (1 - k) || 0;
  const mOut = (m - k) / (1 - k) || 0;
  const yOut = (y - k) / (1 - k) || 0;

  return {
    c: Math.round(cOut * 100),
    m: Math.round(mOut * 100),
    y: Math.round(yOut * 100),
    k: Math.round(k * 100),
  };
}
