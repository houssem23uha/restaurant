import Header from "./components/Header";
import styles from "./app.module.scss";
import Footer from "./components/Footer";
import Content from "./components/Content";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <div className={`${styles.appContainer} d-flex flex flex-column`}>
          <Content />
        </div>
        <Footer />
      </QueryClientProvider>
    </>
  );
}

export default App;
