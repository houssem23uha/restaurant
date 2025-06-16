// src/Content.tsx
import { Route, Routes } from "react-router-dom";
import Menu from "./Menu";
import HomeContent from "./HomeContent";
import FavoriteDishes from "./FavoriteDishes";
import Carte from "./Carte";
import Login from "./Login";
import Layout from "./Layout";
import Register from "./Register";
import Account from "./Account";
import ReservationComponent from "./ReservationComponent.tsx";

function Content() {
  return (
    <Routes>
      {/* Routes AVEC Layout */}
      <Route element={<Layout />}>
       <Route path="/account" element={<Account />} />
       <Route path="/register" element={<Register />} />
        <Route path="/carte" element={<Carte />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/items" element={<HomeContent />} />
        <Route path="/orders" element={<HomeContent />} />
        <Route path="/orders/history" element={<HomeContent />} />
        <Route path="/reservation" element={<ReservationComponent />} />
        <Route path="/delivery-info" element={<HomeContent />} />
        <Route path="/user/account" element={<HomeContent />} />
        <Route path="/user/account/favoris" element={<FavoriteDishes />} />
        <Route path="/user/account/orders" element={<HomeContent />} />
        <Route path="/user/account/settings" element={<HomeContent />} />
        <Route path="/contact" element={<HomeContent />} />
      </Route>

      {/* Routes SANS layout */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default Content;
