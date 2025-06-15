import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import ReservationForm from "./components/ReservationForm";
import styles from "./app.module.scss";

function App() {
  const isReservationPage = window.location.pathname === "/reservation";

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
