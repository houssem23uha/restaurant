import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import Accueil from "./components/Accueil";
import HeaderHome from "./components/HeaderHome";
import styles from "./app.module.scss";
import { BrowserRouter, useLocation } from "react-router-dom";
import { CustomerProvider } from "./components/CustomerContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CustomerProvider>
          <AppContent />
        </CustomerProvider>
      </QueryClientProvider>
    </BrowserRouter>
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
