import React, { useState, useEffect } from "react";
import { useCustomer } from "./CustomerContext";
import { updateCustomer, uploadPhoto } from "./services/customerService";
import type { Customer } from "./models/Customer";
import styles from "./Register.module.scss"; // ou un fichier dédié Account.module.scss

export default function Account() {
  const { customer, setCustomer } = useCustomer();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState<Partial<Customer>>({
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
    photo: "",
    addresses: [
      {
        street: "",
        city: "",
        postalCode: "",
        country: "",
      },
    ],
  });

  // Sync formData + photoPreview with customer
  useEffect(() => {
  if (customer) {
    setFormData({
      firstname: customer.firstname || "",
      lastname: customer.lastname || "",
      phone: customer.phone || "",
      password: customer.password || "",
      photo: customer.photo || "",
      addresses: [
        {
          street: customer.addresses?.[0]?.street || "",
          city: customer.addresses?.[0]?.city || "",
          postalCode: customer.addresses?.[0]?.postalCode || "",
          country: customer.addresses?.[0]?.country || "",
        },
      ],
    });

    // Ici on utilise la photo déjà chargée dans le contexte, supposée base64 ou dataURL
    setPhotoPreview(customer.photo || null);

    setSelectedFile(null);
    setErrorMsg("");
    setMessage("");
  }
}, [customer]);

  if (!customer) return <p>Chargement du compte...</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "photo" && files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    } else if (name.startsWith("address.")) {
      const field = name.split(".")[1] as keyof Customer["addresses"][0];
      setFormData((prev) => {
        const updatedAddress = {
          ...(prev.addresses?.[0] || {}),
          [field]: value,
        };
        return { ...prev, addresses: [updatedAddress] };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setMessage("");

    try {
      let photoFileName = formData.photo;

      if (selectedFile && customer.firstname) {
        const fileExt = selectedFile.name.split(".").pop();
        const newFileName = `${customer.firstname.toLowerCase()}.${fileExt}`;

        await uploadPhoto(selectedFile, newFileName);

        photoFileName = newFileName;
      }

      // Compose l'objet Customer complet pour la mise à jour
      const updatedCustomer: Customer = {
        ...customer,
        firstname: formData.firstname || "",
        lastname: formData.lastname || "",
        phone: formData.phone || "",
        password: formData.password || "",
        photo: photoFileName || "",
        addresses: [
          {
            id: customer.addresses?.[0]?.id,
            street: formData.addresses?.[0]?.street || "",
            city: formData.addresses?.[0]?.city || "",
            postalCode: formData.addresses?.[0]?.postalCode || "",
            country: formData.addresses?.[0]?.country || "",
          },
        ],
      };
      console.log("updated :", updatedCustomer);

      const saved = await updateCustomer(customer.id, updatedCustomer);
      setCustomer(saved);
      console.log("saved :", saved);
      localStorage.setItem("customer", JSON.stringify(saved));
      setMessage("Profil mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      setErrorMsg("Erreur lors de la mise à jour du profil.");
    }
  };

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
        />

        <div className={styles.fieldsGrid}>
          <label>
            Prénom :
            <input
              name="firstname"
              value={formData.firstname || ""}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Nom :
            <input
              name="lastname"
              value={formData.lastname || ""}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Téléphone :
            <input
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              required
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
            />
          </label>
        </div>

        <fieldset>
          <legend>Adresse</legend>

          <label>
            Rue :
            <input
              name="address.street"
              value={formData.addresses?.[0]?.street || ""}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Ville :
            <input
              name="address.city"
              value={formData.addresses?.[0]?.city || ""}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Code postal :
            <input
              name="address.postalCode"
              value={formData.addresses?.[0]?.postalCode || ""}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Pays :
            <input
              name="address.country"
              value={formData.addresses?.[0]?.country || ""}
              onChange={handleChange}
              required
            />
          </label>
        </fieldset>

        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}
