import { useLocation } from "react-router-dom";
import styles from "./HomeContent.module.scss";
import Recipe from "./recipe";
import Breadcrumb from "./Breadcrumb";

function HomeContent() {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <div className={`${styles.HomeContent}`}>
        <div className="row">
          <Breadcrumb location={location} />
        </div>

        <div className="grid">
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
          <Recipe vote={false} />
          <Recipe vote={false} />
        </div>
      </div>
    </>
  );
}
export default HomeContent;
