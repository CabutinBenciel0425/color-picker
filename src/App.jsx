import { useEffect, useMemo, useState } from "react";
import ScrollableColorPicker from "./ScrollableColorPicker";
import "./styles.css";
import { hslToRgb } from "./utils/hslToRgb";
import { rgbToHex } from "./utils/rgbToHex";
import { rgbToCmyk } from "./utils/rgbToCmyk";
import { rgbToHsv } from "./utils/rgbToHsv";

function App() {
  const [bgColor, setBgColor] = useState(0.0);
  const { r, g, b } = useMemo(() => {
    const computedRgb = hslToRgb(bgColor, 100, 50);
    if (computedRgb.r === 0 && computedRgb.g === 0 && computedRgb.b === 0) {
      return { r: 255, g: 0, b: 0 };
    }

    return computedRgb;
  }, [bgColor]);

  // HEX guard
  const hex = useMemo(() => {
    const computedHex = rgbToHex(r, g, b);
    return computedHex === "#000000" ? "#FF0000" : computedHex;
  }, [r, g, b]);

  // CMYK guard
  const { c, m, y, k } = useMemo(() => {
    const computed = rgbToCmyk(r, g, b);
    // If it's pure black, force red equivalent
    if (
      computed.c === 0 &&
      computed.m === 0 &&
      computed.y === 0 &&
      computed.k === 100
    ) {
      return rgbToCmyk(255, 0, 0); // red
    }
    return computed;
  }, [r, g, b]);

  // HSV guard
  const { h, s, v } = useMemo(() => {
    const computed = rgbToHsv(r, g, b);
    // If it's black, force red equivalent
    if (computed.h === 0 && computed.s === 0 && computed.v === 0) {
      return rgbToHsv(255, 0, 0); // red
    }
    return computed;
  }, [r, g, b]);

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
