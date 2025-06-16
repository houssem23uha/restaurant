import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Customer } from "./models/Customer";

interface CustomerContextType {
  customer: Customer | null;
  setCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
  photo: string | null;
  setPhoto: React.Dispatch<React.SetStateAction<string | null>>;
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
  useEffect(() => {
    const savedCustomer = localStorage.getItem("customer");
    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("customer");
    setCustomer(null);
    setPhoto(null);
  };

  return (
    <CustomerContext.Provider value={{ customer, setCustomer, photo, setPhoto, logout }}>
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
