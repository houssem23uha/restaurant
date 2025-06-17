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
import CustomerReservations from "./CustomerReservations.tsx";
import Rest from "./tests/Rest";
import ItemsList from "./testApi/ItemsList";
import ItemDetails from "./testApi/ItemDetails";
import ItemForm from "./testApi/ItemForm";
import ItemFormUpdate from "./testApi/ItemFormUpdate";
import OrderList from "./OrderList";

function Content() {
  return (
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
            <Route path="/orders" element={<OrderList />} />
            <Route path="/orders/history" element={<HomeContent />} />
            <Route path="/reservation" element={<HomeContent />} />
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
          <Route path="/mesreservations" element={<CustomerReservations />} />
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
