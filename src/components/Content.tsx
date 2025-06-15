import { Route, BrowserRouter, Routes } from "react-router-dom";

import styles from "./Content.module.scss";
import Menu from "./Menu";
import HomeContent from "./HomeContent";
import FavoriteDishes from "./FavoriteDishes";
import Rest from "./tests/Rest";
import ReservationForm from "./ReservationForm";

function Content() {
  return (
    <BrowserRouter>
      <div className={`${styles.appContainer} d-flex flex flex-column`}>
        <div className={`${styles.content} container flex-fill mt-2 p-4`}>
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/items" element={<HomeContent />} />
            <Route path="/orders" element={<HomeContent />} />
            <Route path="/orders/history" element={<HomeContent />} />
            <Route path="/reservations" element={<HomeContent />} />
            <Route path="/delivery-info" element={<HomeContent />} />
            <Route path="/user/account" element={<HomeContent />} />
            <Route path="/user/account/favoris" element={<FavoriteDishes />} />
            <Route path="/user/account/orders" element={<HomeContent />} />
            <Route path="/user/account/settings" element={<HomeContent />} />
            <Route path="/contact" element={<HomeContent />} />
            <Route path="/rest" element={<Rest />} />
            <Route path="/reservation" element={<ReservationForm />} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Content;
