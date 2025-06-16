import { useLocation } from "react-router-dom";
import styles from "./HomeContent.module.scss";
/* import Recipe from "./recipe";
 */ import { useState } from "react";

function HomeContent() {
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  console.log(location);
  return (
    <>
      <div className={`${styles.HomeContent}`}>
        <div className="row mb-3">
          <form className=" col-8 mx-auto d-flex flex-row align-items-center m-2 p-2 gap-2">
            <button type="submit" className="btn btn-reverse-primary border-0">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            {!isFocused && inputValue === "" && (
              <label htmlFor="search">
                <strong>Je cherche</strong>
              </label>
            )}

            <input
              id="search"
              type="text"
              placeholder="un plat, un dersert ..."
              className="flex-fill"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <button type="submit" className="btn btn-primary">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>

        <div className="grid">
          {/*           <Recipe vote={false} />
          <Recipe vote={false} />
          <Recipe vote={false} />
          <Recipe vote={false} />
          <Recipe vote={false} />
          <Recipe vote={false} />
          <Recipe vote={false} />
          <Recipe vote={false} />
          <Recipe vote={false} />
          <Recipe vote={false} />
          <Recipe vote={false} />
          <Recipe vote={false} /> */}
        </div>
      </div>
    </>
  );
}
export default HomeContent;
