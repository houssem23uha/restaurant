import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import type { Customer } from "./models/Customer";
import type { Address } from "./models/Address";
import { createCustomer,uploadPhoto } from "./services/customerService";

export default function Register() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [customer, setCustomer] = useState<Partial<Customer>>({
    login: "",
    password: "",
    firstname: "",
    lastname: "",
    phone: "",
    photo: undefined,
    addresses: [{
      street: "",
      city: "",
      postalCode: "",
      country: "",
    }],
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "photo" && files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    } else if (name.startsWith("address.")) {
      const field = name.split(".")[1] as keyof Address;
      setCustomer(prev => {
        const updatedAddress = { ...prev.addresses?.[0], [field]: value };
        return { ...prev, addresses: [updatedAddress] };
      });
    } else {
      const key = name as keyof Customer;
      setCustomer(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

   try {
    let photoFileName = customer.photo;

    if (selectedFile && customer.login) {
      const fileExt = selectedFile.name.split(".").pop();
      const newFileName = `${customer.login}.${fileExt}`;

      // Upload via service
      await uploadPhoto(selectedFile, newFileName);

      photoFileName = newFileName;
    }

    await createCustomer({ ...customer, photo: photoFileName } as Customer);

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
   {/* Grille des champs principaux */}
        <div className={styles.fieldsGrid}>
          <label>
            Login :
            <input
              name="login"
              value={customer.login}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Mot de passe :
            <input
              name="password"
              type="password"
              value={customer.password}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Prénom :
            <input
              name="firstname"
              value={customer.firstname}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Nom :
            <input
              name="lastname"
              value={customer.lastname}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Téléphone :
            <input
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        {/* Adresse */}
        <fieldset>
          <legend>Adresse</legend>

          <label>
            Rue :
            <input
              name="address.street"
              value={customer.addresses?.[0]?.street || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            Ville :
            <input
              name="address.city"
              value={customer.addresses?.[0]?.city || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            Code postal :
            <input
              name="address.postalCode"
              value={customer.addresses?.[0]?.postalCode || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            Pays :
            <input
              name="address.country"
              value={customer.addresses?.[0]?.country || ""}
              onChange={handleChange}
            />
          </label>
        </fieldset>

        <button type="submit">Créer mon compte</button>
      </form>
    </div>
  );
}