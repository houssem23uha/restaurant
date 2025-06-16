import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { useCustomer } from "./CustomerContext";
import { useLoginCustomer } from "./hooks/customers/useCustomerMutations";
import { useLoadPhoto } from "./hooks/customers/useCustomerPhoto";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [photoFilename, setPhotoFilename] = useState<string | null>(null);

  const navigate = useNavigate();
  const { setCustomer, setPhoto } = useCustomer();

  const loginMutation = useLoginCustomer();
  const {
    data: photoBase64,
    isSuccess: isPhotoLoaded,
  } = useLoadPhoto(photoFilename || undefined);

  useEffect(() => {
    if (isPhotoLoaded && photoBase64) {
      setPhoto(photoBase64);
      navigate("/");
    }
  }, [isPhotoLoaded, photoBase64, setPhoto, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    loginMutation.mutate(
        { login: email, password },
        {
          onSuccess: (customer) => {
            localStorage.setItem("customer", JSON.stringify(customer));
            setCustomer(customer);
            setPhotoFilename(customer.photo);
          },
          onError: () => {
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
