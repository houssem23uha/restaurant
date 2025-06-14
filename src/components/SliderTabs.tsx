import { useRef, useEffect, useState } from "react";
import styles from "./SliderTabs.module.scss";

const tabsData = ["Entree", "Plat", "Dessert", "Boisson"];

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
    <div
      className={`${styles.SliderTabs} d-flex justify-content-center align-items-center gap-2`}
    >
      {tabsData.map((label, index) => (
        <button
          key={index}
          ref={(el) => {
            tabsRef.current[index] = el;
          }}
          className={`${styles.TabButton} flex-grow-1`}
          onClick={() => setActiveIndex(index)}
        >
          {label}
        </button>
      ))}
      <div className={`${styles.Slider}`} ref={sliderRef} />
    </div>
  );
};

export default SliderTabs;
