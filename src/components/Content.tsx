import styles from "./Content.module.scss";
import Recipe from "./recipe";
function Content() {
  return (
    <div className={`${styles.content} container flex-fill mt-2 p-4`}>
      <div className={styles.grid}>
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
      </div>
    </div>
  );
}

export default Content;
