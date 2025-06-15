import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import { BrowserRouter, useLocation } from "react-router-dom";
import Accueil from "./components/Accueil";
import HeaderHome from "./components/HeaderHome";
import styles from "./app.module.scss";


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  if (location.pathname === "/") {
    // Page Accueil avec son header
    return (
    <>
      <HeaderHome />
      <Accueil />  
      <Footer />
    </>
  );
  }

  // Toutes les autres pages avec Header, Content, Footer et container
  return (
    <>
      <Header />
       <div className={`${styles.appContainer} d-flex flex flex-column`}>
      <Content />  {/* Content contient les Routes sauf "/" */}
      </div>
      <Footer />
    </>
  );
}

export default App;
