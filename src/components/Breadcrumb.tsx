import styles from "./Breadcrumb.module.scss";

function Breadcrumb({ location }) {
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <ol className={`${styles.Breadcrumb} d-flex align-items-center`}>
      <li>
        <a href="/">Accueil</a>
      </li>
      {pathnames.map((value) => {
        return (
          <li>
            <a href="/">{decodeURIComponent(value)}</a>
          </li>
        );
      })}
    </ol>
  );
}
export default Breadcrumb;
