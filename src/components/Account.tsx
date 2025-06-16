import React, { useState, useEffect } from "react";
import { useCustomer } from "./CustomerContext";
import styles from "./Register.module.scss";
import type { Customer, Address } from "./types/index";
import { useUpdateCustomer } from "./hooks/customers/useCustomerMutations";
import {  useUploadPhoto } from "./hooks/customers/useCustomerPhoto";

// Ajout d'un hook fictif pour la mise à jour d'adresse
import { useUpdateAddress } from "./hooks/addresses/useAddressMutations";

export default function Account() {
  const { customer, setCustomer } = useCustomer();
  const updateCustomerMutation = useUpdateCustomer();
  const uploadPhotoMutation = useUploadPhoto();
  const updateAddressMutation = useUpdateAddress();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [message, setMessage] = useState("");
  const [editingAddress, setEditingAddress] = useState(false);

  const [formData, setFormData] = useState<Partial<Customer>>({
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
    photo: "",
  });

  const [addressData, setAddressData] = useState<Address>({
    id: 0,
    street: "",
    city: "",
    postalCode: "",
    country: "",
    version: 0, // Assurez-vous d'initialiser la version si nécessaire
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        firstname: customer.firstname,
        lastname: customer.lastname,
        phone: customer.phone,
        password: customer.password,
        photo: customer.photo,
      });
      setPhotoPreview(customer.photo || null);

      const addr = customer.addresses?.[0];
      setAddressData(
        addr || {
          id: 0,
          street: "",
          city: "",
          postalCode: "",
          country: "",
        }
      );

      setSelectedFile(null);
      setErrorMsg("");
      setMessage("");
      setEditingAddress(false);


      console.log("Customer loaded:", customer);
      console.log("Address loaded:", addr);
    }
  }, [customer]);

  if (!customer) return <p>Chargement du compte...</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Gère les changements sur le formulaire d'adresse
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
  };

  // Soumission du formulaire principal (sans adresse)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setMessage("");

    try {
      let photoFileName = formData.photo;

      if (selectedFile && customer.login) {
        const ext = selectedFile.name.split(".").pop();
        const newFileName = `${customer.login}.${ext}`;
        await uploadPhotoMutation.mutateAsync({ file: selectedFile, fileName: newFileName });
        photoFileName = newFileName;
      }

      // Mise à jour du client en envoyant juste l'id de l'adresse existante
      const updatedCustomer: Customer = {
        ...customer,
        firstname: formData.firstname || "",
        lastname: formData.lastname || "",
        phone: formData.phone || "",
        password: formData.password || "",
        photo: photoFileName || "",
        addresses: [addressData], //pas juste l'id mais tout
      };
      console.log("old Customer",customer);
      console.log("updated Customer",updatedCustomer);
      const saved = await updateCustomerMutation.mutateAsync(updatedCustomer);
      console.log("saved Customer",saved);
      setCustomer(saved);
      localStorage.setItem("customer", JSON.stringify(saved));
      setMessage("Profil mis à jour avec succès !");
    } catch (err) {
      console.error("Erreur :", err);
      setErrorMsg("Échec de la mise à jour du profil.");
    }
  };

  // Soumission du formulaire adresse (uniquement adresse)
  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setMessage("");

    try {
      if (!addressData.id) {
        setErrorMsg("Adresse non valide");
        return;
      }

      const updatedAddr = await updateAddressMutation.mutateAsync(addressData);
      setAddressData(updatedAddr);

      // Optionnel : si l'adresse mise à jour est dans le client, on peut mettre à jour localement
      setCustomer((prev) => prev ? { ...prev, addresses: [updatedAddr] } : null);
      localStorage.setItem("customer", JSON.stringify({ ...customer, addresses: [updatedAddr] }));

      setMessage("Adresse mise à jour !");
      setEditingAddress(false);
    } catch (err) {
      console.error(err);
      setErrorMsg("Erreur lors de la mise à jour de l'adresse.");
    }
  };

  const isLoading =
    updateCustomerMutation.isPending ||
    uploadPhotoMutation.isPending ||
    updateAddressMutation.isPending;

  return (
    <div className={styles.createAccountContainer}>
      <form className={styles.createAccountForm} onSubmit={handleSubmit}>
        <h2>Mon compte</h2>

        {errorMsg && <p className={styles.error}>{errorMsg}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}

        {photoPreview && (
          <img
            src={photoPreview}
            alt="Photo de profil"
            className={styles.profilePicture}
          />
        )}

        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
          disabled={isLoading}
        />

        <div className={styles.fieldsGrid}>
          <label>
            Prénom :
            <input
              name="firstname"
              value={formData.firstname || ""}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </label>

          <label>
            Nom :
            <input
              name="lastname"
              value={formData.lastname || ""}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </label>

          <label>
            Téléphone :
            <input
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </label>

          <label>
            Mot de passe :
            <input
              name="password"
              type="password"
              value={formData.password || ""}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </label>
        </div>

        <section style={{ marginTop: "1rem" }}>
          <h3>Adresse</h3>

          {!editingAddress ? (
            <>
              <p>
                {addressData.street
                  ? `${addressData.street}, ${addressData.city}, ${addressData.postalCode}, ${addressData.country}`
                  : "Aucune adresse enregistrée."}
              </p>
              <button
                type="button"
                onClick={() => setEditingAddress(true)}
                disabled={isLoading}
              >
                Modifier mon adresse
              </button>
            </>
          ) : (
            <form onSubmit={handleAddressSubmit} style={{ marginTop: "1rem" }}>
              <label>
                Rue :
                <input
                  name="street"
                  value={addressData.street}
                  onChange={handleAddressChange}
                  required
                  disabled={isLoading}
                />
              </label>
              <label>
                Ville :
                <input
                  name="city"
                  value={addressData.city}
                  onChange={handleAddressChange}
                  required
                  disabled={isLoading}
                />
              </label>
              <label>
                Code postal :
                <input
                  name="postalCode"
                  value={addressData.postalCode}
                  onChange={handleAddressChange}
                  required
                  disabled={isLoading}
                />
              </label>
              <label>
                Pays :
                <input
                  name="country"
                  value={addressData.country}
                  onChange={handleAddressChange}
                  required
                  disabled={isLoading}
                />
              </label>

              <div style={{ marginTop: "0.5rem" }}>
                <button type="submit" disabled={isLoading}>
                  Sauvegarder l'adresse
                </button>
                <button
                  type="button"
                  onClick={() => setEditingAddress(false)}
                  disabled={isLoading}
                  style={{ marginLeft: "1rem" }}
                >
                  Annuler
                </button>
              </div>
            </form>
          )}
        </section>

        <button className="btn btn-reverse-primary" 
          
          
          disabled={isLoading}
          style={{ marginTop: "2rem" }}
        >
          {isLoading ? "Mise à jour..." : "Mettre à jour"}
        </button>
      </form>
    </div>
  );
}
