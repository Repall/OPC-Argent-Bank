import { loginURL, profileURL } from "../utils/urls";
import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import {
  setAuthenticating,
  setUserInfos,
  loginError,
  resetState,
  editUser,
} from "./auth";

interface LoginResponse {
  body: {
    token: string;
  };
}

interface ProfileResponse {
  body: {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
}

export const authMiddleware = {
  // CHECK UTILISATEUR DEJA CONNECTÉ
  checkAuth: (dispatch: Dispatch, navigate: NavigateFunction) => {
    const token: string | null = localStorage.getItem("token");
  
    if (token) {
      dispatch(setAuthenticating({ isLoggedIn: true, token }));
      authMiddleware.fetchProfile(dispatch, token, navigate);
      navigate("/user"); 
    } else {
      navigate("/login");
    }
  },

  // CONNECTION
  login: async (
    dispatch: Dispatch,
    email: string,
    password: string,
    rememberMe: boolean,
    navigate: NavigateFunction,
  ): Promise<void> => {
    try {
      // Requête de connexion
      console.log("Requête envoyée à /user/login");
      const response = await fetch(loginURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur de connexion");
      }

      const loginData: LoginResponse = await response.json();
      const token: string | null = loginData.body?.token;

      if (!token) {
        throw new Error("Token manquant dans la réponse du serveur");
      }

      // Mise à jour du store avec le token
      dispatch(setAuthenticating({ isLoggedIn: true, token }));

      // Enregistre le token dans le localStorage si "Remember Me" est activé
      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token")
        
      }
      // Récupération des informations utilisateur
      await authMiddleware.fetchProfile(dispatch, token, navigate);

      // Redirection après connexion réussie
      navigate("/user");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Une erreur inconnue est survenue.");
      }
    }
  },

  fetchProfile: async (
    dispatch: Dispatch,
    token: string,
    navigate: NavigateFunction,
  ) => {
    try {
      console.log("Requête envoyée à /user/profile avec token :", token);

      const response = await fetch(profileURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Réponse reçue de /profile :", response);

      if (!response.ok) {
        const errorMessage = `Erreur HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const profileData: ProfileResponse = await response.json();
      console.log("Données utilisateur reçues :", profileData);

      dispatch(
        setUserInfos({
          userName: profileData.body.userName || "",
          firstName: profileData.body.firstName || "",
          lastName: profileData.body.lastName || "",
          email: profileData.body.email || "",
        }),
      );
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations utilisateur :",
        (error as Error).message,
      );
      dispatch(loginError((error as Error).message));
      dispatch(resetState());
      navigate("/login");
    }
  },

  // MODIFIER LE USERNAME
  editUserName: async (
    dispatch: Dispatch,
    token: string,
    newUserName: string,
  ): Promise<void> => {
    try {
      console.log("Requête envoyée à /user/profil");
      const response = await fetch(profileURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName: newUserName }),
      });

      if (!response.ok) {
        const errorMessage = `Erreur HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const updatedData: ProfileResponse = await response.json();

      // Mise à jour du store Redux avec les nouvelles données
      dispatch(
        setUserInfos({
          userName: updatedData.body.userName,
          firstName: updatedData.body.firstName,
          lastName: updatedData.body.lastName,
          email: updatedData.body.email,
        }),
      );

      // Sortir du mode édition
      dispatch(editUser({ editionMode: false }));

      console.log(
        "Nom d'utilisateur mis à jour avec succès :",
        updatedData.body.userName,
      );
    } catch (error) {
      console.error(
        "Erreur lors de la modification du nom d'utilisateur :",
        (error as Error).message,
      );
    }
  },
};
