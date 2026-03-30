import React, { useEffect, useRef, useState } from "react";

export default function ScrollableColorPicker({ setBgColor }) {
  const scroll = useRef(null);
  const bar = useRef(null);
  const [boundingRectBar, setBoundingRectBar] = useState(null);
  const [boxSize, setBoxSize] = useState(null);
  const [btnSize, setBtnSize] = useState(null);
  const [btnX, setBtnX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const percentage =
    boxSize && btnSize ? btnX / (boxSize.width - btnSize.width) : 0;
  const hue = percentage * 360;

  useEffect(() => {
    const rectBar = bar.current.getBoundingClientRect();

    setBoundingRectBar({
      top: rectBar.top,
      left: rectBar.left,
    });
    setBoxSize({
      width: bar.current.clientWidth,
      height: bar.current.clientHeight,
    });
    setBtnSize({
      width: scroll.current.clientWidth,
    });
  }, [scroll, bar]);

  function onMouseDown(e) {
    const offset = e.clientX - boundingRectBar.left - btnX;
    setDragOffset(offset);
    console.log("offset", offset);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  function onMouseMove(e) {
    let posX = e.clientX - boundingRectBar.left - dragOffset;
    console.log(posX);
    const maxX = boxSize.width - btnSize.width;
    if (posX < 0) posX = 0;
    if (posX > maxX) posX = maxX;

    setBtnX(posX);
    const percentage = posX / maxX;
    const hue = percentage * 360;
    setBgColor(hue);
  }

  function onMouseUp() {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  return (
    <div className="color-bar" ref={bar}>
      <div
        className="scroll-btn"
        onMouseDown={(e) => onMouseDown(e)}
        ref={scroll}
        style={{ left: btnX + "px" }}
      ></div>
    </div>
  );
}
