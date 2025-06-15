import { Route, BrowserRouter, Routes } from "react-router-dom";

import styles from "./Content.module.scss";
import Menu from "./Menu";
import HomeContent from "./HomeContent";
import FavoriteDishes from "./FavoriteDishes";

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
            <Route path="/reservation" element={<HomeContent />} />
            <Route path="/delivery-info" element={<HomeContent />} />
            <Route path="/account" element={<HomeContent />} />
            <Route path="/account/favoris" element={<FavoriteDishes />} />
            <Route path="/account/orders" element={<HomeContent />} />
            <Route path="/account/settings" element={<HomeContent />} />
            <Route path="/contact" element={<HomeContent />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Content;
