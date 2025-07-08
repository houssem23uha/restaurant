import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type {Customer , Order} from "./types";

interface CustomerContextType {
  customer: Customer | null;
  setCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
  photo: string | null;
  setPhoto: React.Dispatch<React.SetStateAction<string | null>>;
  order: Order | null;
  setOrder: React.Dispatch<React.SetStateAction<Order | null>>;
  logout: () => void;
}

// Typage du props children
interface CustomerProviderProps {
  children: ReactNode;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const savedCustomer = localStorage.getItem("customer");
    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
    }
  const savedOrder = localStorage.getItem("order");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  useEffect(() => {
    if (order) {
      localStorage.setItem("order", JSON.stringify(order));
    } else {
      localStorage.removeItem("order");
    }
  }, [order]);

  

  const logout = () => {
    localStorage.removeItem("customer");
    localStorage.removeItem("order");
    setCustomer(null);
    setPhoto(null);
     setOrder(null);
  };

return (
    <CustomerContext.Provider
      value={{
        customer,
        setCustomer,
        photo,
        setPhoto,
        order,
        setOrder,
        logout,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};


export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
};
