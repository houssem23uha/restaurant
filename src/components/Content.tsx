import {Route, Routes} from "react-router-dom";
import Menu from "./Menu";
import HomeContent from "./HomeContent";
import FavoriteDishes from "./FavoriteDishes";
import ItemsList from "./testApi/ItemsList";
import ItemDetails from "./testApi/ItemDetails";
import ItemForm from "./testApi/ItemForm";
import ItemFormUpdate from "./testApi/ItemFormUpdate";
import OrderList from "./OrderList";
import styles from "./Content.module.scss";

import Carte from "./Carte";
import Login from "./Login";
import Register from "./Register";
import Account from "./Account";
import ReservationComponent from "./ReservationComponent.tsx";
import CustomerReservations from "./CustomerReservations.tsx";

function Content() {
    return (
        <div className={`${styles.appContainer} d-flex flex flex-column`}>
            <div className={`${styles.content} container flex-fill mt-2 p-4`}>
                <Routes>
                    <Route path="/" element={<HomeContent />} />

                    {/* Items */}
                    <Route path="/liste" element={<ItemsList />} />
                    <Route path="/ItemsList" element={<ItemsList />} /> {/* Garde seulement un des deux idéalement */}
                    <Route path="/ItemDetails/:id" element={<ItemDetails />} />
                    <Route path="/ItemForm" element={<ItemForm />} />
                    <Route path="/ItemFormUpdate/:id" element={<ItemFormUpdate />} />

                    {/* Menu & Carte */}
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/menu/items" element={<HomeContent />} />
                    <Route path="/carte" element={<Carte />} />

                    {/* Commandes */}
                    <Route path="/orders" element={<OrderList />} />
                    <Route path="/orders/history" element={<HomeContent />} />

                    {/* Réservations */}
                    <Route path="/reservation" element={<ReservationComponent />} />
                    <Route path="/mesreservations" element={<CustomerReservations />} />

                    {/* Compte utilisateur */}
                    <Route path="/account" element={<Account />} />
                    <Route path="/account/favoris" element={<FavoriteDishes />} />
                    <Route path="/account/orders" element={<HomeContent />} />
                    <Route path="/account/settings" element={<HomeContent />} />

                    {/* Informations complémentaires */}
                    <Route path="/delivery-info" element={<HomeContent />} />
                    <Route path="/contact" element={<HomeContent />} />

                    {/* Authentification */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                </Routes>
            </div>
        </div>
    );
}

export default Content;
