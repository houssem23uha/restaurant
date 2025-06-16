import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import { BrowserRouter, useLocation } from "react-router-dom";
import Accueil from "./components/Accueil";
import HeaderHome from "./components/HeaderHome";
import styles from "./app.module.scss";
import { CustomerProvider } from "./components/CustomerContext";


function App() {
  return (
    <CustomerProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CustomerProvider>
  );
}

function AppContent() {
  const location = useLocation();

  if (location.pathname === "/") {
    return (
      <>
        <HeaderHome />
        <Accueil />
        <Footer />
      </>
    );
  }

  //const isLogin = location.pathname === "/login";

  return (
    <>
      {/*!isLogin && <Header />*/}
       <Header />
      <div className={`${styles.appContainer} d-flex flex flex-column`}>
        <Content />
      </div>
      <Footer />
    </>
  );
}


export default App;
