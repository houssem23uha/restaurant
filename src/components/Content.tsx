import { Route, BrowserRouter, Routes, Outlet } from "react-router-dom";
import styles from "./Content.module.scss";
import Menu from "./Menu";
import HomeContent from "./HomeContent";
import FavoriteDishes from "./FavoriteDishes";
import Reservation from "./Reservation.tsx";

const Layout = () => (
  <div className="d-flex flex flex-column">
    <div className={`${styles.content} container flex-fill mt-2 p-4`}>
      <Outlet />
    </div>
  </div>
);

function Content() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/reservations" element={<Reservation />} />

        <Route element={<Layout />}>
          <Route path="/" element={<HomeContent />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/items" element={<HomeContent />} />
          <Route path="/orders" element={<HomeContent />} />
          <Route path="/orders/history" element={<HomeContent />} />
          <Route path="/delivery-info" element={<HomeContent />} />
          <Route path="/user/account" element={<HomeContent />} />
          <Route path="/user/account/favoris" element={<FavoriteDishes />} />
          <Route path="/user/account/orders" element={<HomeContent />} />
          <Route path="/user/account/settings" element={<HomeContent />} />
          <Route path="/contact" element={<HomeContent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Content;
