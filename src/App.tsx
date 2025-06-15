import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import styles from "./App.module.scss";

import styles from "./App.module.scss";

function App() {
  /*   const isReservationPage = window.location.pathname === "/reservation";
   */
  return (
    <>
      <Header />
      /home /
      <div className={`${styles.appContainer} d-flex flex flex-column`}>
        <Content />
      </div>
      <Footer />
    </>
  );
}

export default App;
