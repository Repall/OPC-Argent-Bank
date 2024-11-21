import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../app/store";
import { authMiddleware } from "../features/authMiddleware";
import { setRememberMe } from "../features/auth";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMeState] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile"); 
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authMiddleware.login(dispatch, email, password, rememberMe, navigate);
      dispatch(setRememberMe(rememberMe)); 
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inattendue est survenue.");
      }
    }
  };

  return (
    <div className="flex-1 bg-background">
      <section className="m-auto box-border w-[300px] bg-white p-8">
        <i className="fa fa-user-circle block text-center text-secondary"></i>
        <h2 className="m-5 text-center text-2xl font-bold text-secondary">
          Sign In
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col text-left">
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <input
              className="border border-black p-1 text-lg"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              required
            />
          </div>
          <div className="mb-4 flex flex-col text-left">
            <label className="font-bold" htmlFor="password">
              Password
            </label>
            <input
              className="border border-black p-1 text-lg"
              type="password"
              placeholder="Mot de Passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              required
            />
          </div>
          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMeState(!rememberMe)} 
              id="rememberMe"
            />
            <label htmlFor="rememberMe" className="text-sm">
              Remember Me
            </label>
          </div>

          
          {error && (
            <p className="text-center font-bold text-red-400">
              {error || "Erreur de connexion"}
            </p>
          )}

          <button
            type="submit"
            className="mt-4 block w-full border-primary bg-primary p-2 text-center font-bold text-white"
          >
            Se connecter
          </button>
        </form>
      </section>

      <section className="m-auto box-border flex w-[300px] flex-col gap-5 bg-black p-8 text-white">
        <div>
          <p>tony@stark.com</p>
          <p>password123</p>
        </div>
        <div>
          <p>steve@rogers.com</p>
          <p>password456</p>
        </div>
      </section>
    </div>
  );
}
