import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { resetState } from "../features/auth";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Récupérer le prénom et l'état connecté depuis Redux
  const userName = useSelector((state: RootState) => state.auth.userName);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const handleSignOut = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem("token");

    // Réinitialiser l'état Redux
    dispatch(resetState());

    // Rediriger vers la page de connexion
    navigate("/login");
  };

  return (
    <header className="flex flex-row items-center justify-between px-5 py-1">
      <NavLink to="/">
        <img
          className="h-14 w-52"
          src="/src/assets/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="hidden">Argent Bank</h1>
      </NavLink>
      <nav>
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            
            <NavLink to="/profile" className="font-bold text-secondary">
              <i className="fa fa-user-circle"></i> {userName}
              </NavLink>
            
            <button
              onClick={handleSignOut}
              className="font-bold text-secondary"
            >
              <i className="fa fa-sign-out"></i> Sign out
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="font-bold text-secondary">
            <i className="fa fa-user-circle"></i> Sign in
          </NavLink>
        )}
      </nav>
    </header>
  );
}
