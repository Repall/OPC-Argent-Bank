import ViewTransactions from "../components/ViewTransactions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RootState } from "../app/store";
import { authMiddleware } from "../features/authMiddleware";
import { editUser, setAuthenticating } from "../features/auth";

export default function Profile() {
  const [editUserName, setEditUserName] = useState("");
  const userName = useSelector((state: RootState) => state.auth.userName);
  const firstName = useSelector((state: RootState) => state.auth.firstName);
  const lastName = useSelector((state: RootState) => state.auth.lastName);
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editionMode = useSelector((state: RootState) => state.auth.editionMode);

  const handleEditClick = () => {
    dispatch(editUser({ editionMode: true }));
  };
  const handleCancelClick = () => {
    dispatch(editUser({ editionMode: false }));
  };
  const handleSaveClick = async () => {
    if (token) {
      await authMiddleware.editUserName(dispatch, token, editUserName);
    }
  };
  useEffect(() => {
    if (userName) {
      setEditUserName(userName);
    }
  }, [userName]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
  
    if (!token && !storedToken) {
      navigate("/login");
    } else if (storedToken && !token) {
      dispatch(setAuthenticating({ isLoggedIn: true, token: storedToken }));
      authMiddleware.fetchProfile(dispatch, storedToken, navigate);
    }
  }, [token, navigate, dispatch]);
  

  return (
    <>
      <div className="flex-1 bg-background">
        <div className="text-white text-center mb-8 ">
        {!editionMode ? (
          <div className="flex-1 ">
            <h2 className="py-5 text-3xl font-bold">
              Welcome back <br />
              {firstName} {lastName} !
            </h2>
            <button
              onClick={handleEditClick}
              className="cursor-default border-primary bg-primary p-[10px] text-sm font-bold "
            >
              Edit Name
            </button>
          </div>
        ) : (
          
          <form onSubmit={(e) => e.preventDefault()}>
            <h2 className="py-5 text-3xl font-bold">Edit user info</h2>
            <div>
              <label>User name : </label>
              <input
                className="text-black"
                type="text"
                value={editUserName}
                onChange={(e) => setEditUserName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Prénom :</label>
              <input type="text" value={firstName} disabled />
            </div>
            <div>
              <label>Nom :</label>
              <input type="text" value={lastName} disabled />
            </div>
            <button type="button" onClick={handleSaveClick} className="cursor-default border-primary bg-primary p-[10px] text-sm font-bold text-white">
              Sauvegarder
            </button>
            <button type="button" onClick={handleCancelClick} className="cursor-default border-primary bg-primary p-[10px] text-sm font-bold text-white">
              Cancel
            </button>
          </form>
        )}
      </div>

      <div>

        <ViewTransactions
          title="Argent Bank Checking (x8349)"
          balance="$2,082.79"
          availableBalance="Available Balance"
          />
        <ViewTransactions
          title="Argent Bank Savings (x6712)"
          balance="$10,928.42"
          availableBalance="Available Balance"
          />
        <ViewTransactions
          title="Argent Bank Credit Card (x8349)"
          balance="$184.30"
          availableBalance="Current Balance"
          />
          </div>
      </div>
    </>
  );
}
