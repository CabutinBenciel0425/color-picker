import { useEffect, useMemo, useState } from "react";
import ScrollableColorPicker from "./ScrollableColorPicker";
import "./styles.css";
import { hslToRgb } from "./utils/hslToRgb";
import { rgbToHex } from "./utils/rgbToHex";
import { rgbToCmyk } from "./utils/rgbToCmyk";
import { rgbToHsv } from "./utils/rgbToHsv";

function App() {
  const [bgColor, setBgColor] = useState(0.0);
  const { r, g, b } = useMemo(() => hslToRgb(bgColor, 100, 50), [bgColor]);
  const hex = useMemo(() => rgbToHex(r, g, b), [r, g, b]);
  const { c, m, y, k } = useMemo(() => rgbToCmyk(r, g, b), [r, g, b]);
  const { h, s, v } = useMemo(() => rgbToHsv(r, g, b), [r, g, b]);

  useEffect(() => {
    document.body.style.backgroundColor = `hsl(${bgColor}, 100%, 50%)`;
  }, [bgColor]);

  return (
    <div className="main">
      <ScrollableColorPicker setBgColor={setBgColor} />

      <label htmlFor="hex">HEX</label>
      <input type="text" id="hex" value={hex} readOnly />

      <label htmlFor="rgb">RGB</label>
      <input type="text" id="rgb" value={`${r}, ${g}, ${b}`} readOnly />

      <label htmlFor="cmyk">CMYK</label>
      <input type="text" id="cmyk" value={`${c}, ${m}, ${y}, ${k}`} readOnly />

      <label htmlFor="hsv">HSV</label>
      <input type="text" id="hsv" value={`${h}, ${s}, ${v}`} readOnly />

      <label htmlFor="hsl">HSL</label>
      <input
        type="text"
        id="hsl"
        value={`${bgColor.toFixed(2)}, 100%, 50%`}
        readOnly
      />
    </div>
  );
}

export default App;
