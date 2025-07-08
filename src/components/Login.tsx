import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { useCustomer } from "./CustomerContext";
import { useLoginCustomer } from "./hooks/customers/useCustomerMutations";
import { useLoadPhoto } from "./hooks/customers/useCustomerPhoto";
import {useCreateOrder} from "./hooks/Orders/useOrderMutation"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [photoFilename, setPhotoFilename] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const { setCustomer, setPhoto, setOrder } = useCustomer(); 

  const loginMutation = useLoginCustomer();
  const createOrderMutation = useCreateOrder(); // <-- créer la mutation
  const {
    data: photoBase64,
    isSuccess: isPhotoLoaded,
  } = useLoadPhoto(photoFilename || undefined);

  useEffect(() => {
    if (!isLoggedIn) return;

    if (!photoFilename) {
      navigate("/");
    } else if (isPhotoLoaded && photoBase64) {
      setPhoto(photoBase64);
      navigate("/");
    } else if (photoFilename && isPhotoLoaded && !photoBase64) {
      navigate("/");
    }
  }, [isLoggedIn, photoFilename, isPhotoLoaded, photoBase64, setPhoto, navigate]);

  // handleLogin devient async pour await createOrderMutation
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    loginMutation.mutate(
      { login: email, password },
      {
        onSuccess: async (customer) => {
          console.log("Customer connecté :", customer);
          localStorage.setItem("customer", JSON.stringify(customer));
          setCustomer(customer);
          setPhotoFilename(customer.photo);

          const newOrder = {
            status: "PENDING" as const,
            customer: { id: customer.id },
            order_lines: [],
            totalPrice: 0,
          };

          try {
            // on sauvegarde l'ordre via l'API et on récupère la version sauvegardée
            const createdOrder = await createOrderMutation.mutateAsync(newOrder);
            setOrder(createdOrder); // stocke la commande avec ID etc
            console.log("Order enregistré :", createdOrder);
            setIsLoggedIn(true);
          } catch (error) {
            console.error("Erreur lors de la création de la commande:", error);
            // fallback : on met quand même l'ordre local (sans id)
            setOrder(newOrder);
            setIsLoggedIn(true);
          }

          
        },
        onError: (error) => {
          console.log("Erreur login :", error);
          setErrorMsg("Email ou mot de passe invalide.");
        },
      }
    );
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h2>Connexion Client</h2>
        {errorMsg && <p className={styles.error}>{errorMsg}</p>}

        <label>Email :</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Mot de passe :</label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className={styles.showPasswordLabel}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          <span>Afficher le mot de passe</span>
        </label>

        <button type="submit" style={{ marginTop: "1rem" }} disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Connexion..." : "Se connecter"}
        </button>

        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Pas encore de compte ?{" "}
          <Link to="/register" style={{ color: "var(--primary)" }}>
            Créer un compte
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
