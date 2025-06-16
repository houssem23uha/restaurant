import { Route, BrowserRouter, Routes } from "react-router-dom";

import styles from "./Content.module.scss";
import Menu from "./Menu";
import HomeContent from "./HomeContent";
import FavoriteDishes from "./FavoriteDishes";
import Rest from "./tests/Rest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ItemsList from "./testApi/ItemsList";
import ItemDetails from "./testApi/ItemDetails";
import ItemForm from "./testApi/ItemForm";
import ItemFormUpdate from "./testApi/ItemFormUpdate";
import ReservationComponent from "./ReservationComponent.tsx";
import CustomerReservations from "./CustomerReservations.tsx";

const queryClient = new QueryClient();

function Content() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className={`${styles.appContainer} d-flex flex flex-column`}>
          <div className={`${styles.content} container flex-fill mt-2 p-4`}>
            <Routes>
              <Route path="/liste" element={<ItemsList />} />
              <Route path="/ItemDetails/:id" element={<ItemDetails />} />
              <Route path="/ItemsList" element={<ItemsList />} />
              <Route path="/ItemForm" element={<ItemForm />} />
              <Route path="/ItemFormUpdate/:id" element={<ItemFormUpdate />} />
              <Route path="/" element={<HomeContent />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/menu/items" element={<HomeContent />} />
              <Route path="/orders" element={<HomeContent />} />
              <Route path="/orders/history" element={<HomeContent />} />
              <Route path="/reservation" element={<ReservationComponent />} />
              <Route path="/customer_reservations" element={<CustomerReservations />} />
              <Route path="/delivery-info" element={<HomeContent />} />
              <Route path="/account" element={<HomeContent />} />
              <Route path="/account/favoris" element={<FavoriteDishes />} />
              <Route path="/account/orders" element={<HomeContent />} />
              <Route path="/account/settings" element={<HomeContent />} />
              <Route path="/contact" element={<HomeContent />} />
              <Route path="/rest" element={<Rest />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default Content;
