import Header from "./components/Header";
import styles from "./app.module.scss";
import Footer from "./components/Footer";
import Content from "./components/Content";

function App() {
  return (
    <>
      <Header />
      <div className={`${styles.appContainer} d-flex flex flex-column`}>
        <Content />
      </div>
      <Footer />
    </>
  );
}

export default App;
