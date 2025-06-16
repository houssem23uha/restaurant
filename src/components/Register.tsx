import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import type { Customer , Address} from "./types/index";
import { useCreateCustomer } from "./hooks/customers/useCustomerMutations";
import { useUploadPhoto } from "./hooks/customers/useCustomerPhoto";

export default function Register() {
  const navigate = useNavigate();

  const createCustomerMutation = useCreateCustomer();
  const uploadPhotoMutation = useUploadPhoto();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [customer, setCustomer] = useState<Partial<Customer>>({
    login: "",
    password: "",
    firstname: "",
    lastname: "",
    phone: "",
    photo: undefined,
    addresses: [], // On démarre vide, pas d'adresse direct
  });

  // Adresse séparée en state à part
  const [address, setAddress] = useState<Partial<Address>>({
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  // Contrôle si on affiche le formulaire d'adresse
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "photo" && files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      // Champs client simples
      const key = name as keyof Customer;
      setCustomer((prev) => ({ ...prev, [key]: value }));
    }
  };

  // Gestion formulaire adresse
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof Address;
    setAddress((prev) => ({ ...prev, [key]: value }));
  };

  // Soumission formulaire client
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      let photoFileName = customer.photo;

      if (selectedFile && customer.login) {
        const fileExt = selectedFile.name.split(".").pop();
        const newFileName = `${customer.login}.${fileExt}`;

        await uploadPhotoMutation.mutateAsync({ file: selectedFile, fileName: newFileName });
        photoFileName = newFileName;
      }

      // Ici on injecte l'adresse seulement si elle existe ET a un id (par exemple créé avant)
      // Sinon, on n'envoie pas d'adresse
      const customerToCreate: Customer = {
        ...(customer as Customer),
        photo: photoFileName ?? "",
        addresses: address.street ? [address as Address] : [],
      };

      await createCustomerMutation.mutateAsync(customerToCreate);

      alert("Compte créé avec succès !");
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Erreur inconnue lors de la création du compte.");
      }
    }
  };

  return (
    <div className={styles.createAccountContainer}>
      <form className={styles.createAccountForm} onSubmit={handleSubmit}>
        <h2>Créer un compte client</h2>

        {errorMsg && <p className={styles.error}>{errorMsg}</p>}

        {photoPreview && (
          <img
            src={photoPreview}
            alt="Prévisualisation"
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
            Login :
            <input
              name="login"
              value={customer.login || ""}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Mot de passe :
            <input
              name="password"
              type="password"
              value={customer.password || ""}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Prénom :
            <input
              name="firstname"
              value={customer.firstname || ""}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Nom :
            <input
              name="lastname"
              value={customer.lastname || ""}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Téléphone :
            <input
              name="phone"
              value={customer.phone || ""}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        {/* Bouton pour afficher / masquer le formulaire d'adresse */}
        <div style={{ marginTop: "1rem" }}>
          {!showAddressForm ? (
            <button type="button" onClick={() => setShowAddressForm(true)}>
              {address.street ? "Modifier mon adresse" : "Ajouter une adresse"}
            </button>
          ) : (
            <fieldset style={{ marginTop: "1rem" }}>
              <legend>Adresse</legend>

              <label>
                Numéro & Rue :
                <input
                  name="street"
                  value={address.street || ""}
                  onChange={handleAddressChange}
                  required
                />
              </label>

              <label>
                Ville :
                <input
                  name="city"
                  value={address.city || ""}
                  onChange={handleAddressChange}
                  required
                />
              </label>

              <label>
                Code postal :
                <input
                  name="postalCode"
                  value={address.postalCode || ""}
                  onChange={handleAddressChange}
                  required
                />
              </label>

              <label>
                Pays :
                <input
                  name="country"
                  value={address.country || ""}
                  onChange={handleAddressChange}
                  required
                />
              </label>

              <div style={{ marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setShowAddressForm(false)}>
                  Annuler
                </button>
              </div>
            </fieldset>
          )}
        </div>

        <button  className="btn btn-reverse-primary"  style={{ marginTop: "1.5rem" }}>
          Créer mon compte
        </button>
      </form>
    </div>
  );
}