import { useEffect, useState } from "react";
import ScrollableColorPicker from "./ScrollableColorPicker";
import "./styles.css";

function App() {
  const [bgColor, setBgColor] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = `hsl(${bgColor}, 100%, 50%)`;
  }, [bgColor]);
  return (
    <div className="main">
      <ScrollableColorPicker setBgColor={setBgColor} />

      <label htmlFor="hex">HEX</label>
      <input type="text" id="hex" />

      <label htmlFor="rgb">RGB</label>
      <input type="text" id="rgb" />

      <label htmlFor="cmyk">CMYK</label>
      <input type="text" id="cmyk" />

      <label htmlFor="hsv">HSV</label>
      <input type="text" id="hsv" />

      <label htmlFor="hsl">HSL</label>
      <input type="text" id="hsl" />
    </div>
  );
}

export default App;
