import React, { useRef, useEffect, useState } from "react";
import "./SliderTabs.scss";

const tabsData = ["Tab 1", "Tab 2", "Tab 3"];

const SliderTabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const activeTab = tabsRef.current[activeIndex];
    if (activeTab && sliderRef.current) {
      sliderRef.current.style.width = `${activeTab.offsetWidth}px`;
      sliderRef.current.style.left = `${activeTab.offsetLeft}px`;
    }
  }, [activeIndex]);

  return (
    <div className="slider-tabs">
      <div className="tabs-container">
        {tabsData.map((label, index) => (
          <button
            key={index}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            className={`tab-button ${activeIndex === index ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            {label}
          </button>
        ))}
        <div className="slider" ref={sliderRef} />
      </div>
    </div>
  );
};

export default SliderTabs;
