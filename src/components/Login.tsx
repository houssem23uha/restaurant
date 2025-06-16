import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { loginCustomer , loadPhoto  } from "./services/customerService";
import { useCustomer } from "./CustomerContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

 const { setCustomer, setPhoto } = useCustomer();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginCustomer(email, password);
      const base64 = await loadPhoto(response.photo); // 'photo' est un string (le nom de fichier)

      // Stocker dans localStorage
      localStorage.setItem("customer", JSON.stringify(response));
      // Mettre à jour le contexte
      setCustomer(response);
      setPhoto(base64);

      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg("Email ou mot de passe invalide.");
        console.error("Erreur de connexion :", error.message);
      } else {
        setErrorMsg("Une erreur inconnue est survenue.");
        console.error("Erreur inconnue :", error);
      }
    }
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
            onChange={() => setShowPassword(prev => !prev)}
          />
          <span>Afficher le mot de passe</span>
        </label>

        <button type="submit" style={{ marginTop: "1rem" }}>
          Se connecter
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
