import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	userName: "",
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	token: "",
	rememberMe: false,
	isLoggedIn: false,
	editionMode: false,
	error: null,
}

export const auth = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// Informations utilisateur
		setUserInfos: (state, action) => {
			state.userName = action.payload.userName
			state.firstName = action.payload.firstName
			state.lastName = action.payload.lastName
			state.email = action.payload.email
			state.rememberMe = action.payload.rememberMe
		},

		// Token utilisateur connecté
		setAuthenticating: (state, action) => {
			state.isLoggedIn = action.payload.isLoggedIn
			state.token = action.payload.token
			
			localStorage.setItem("token", action.payload.token)
		},
		// Reset informations utilisateur
		resetState: (state) => {
			state.userName = ""
			state.firstName = ""
			state.lastName = ""
			state.email = ""
			state.password = ""
			state.token = ""
			state.rememberMe = false
			state.isLoggedIn = false
			state.editionMode = false
			state.error = null
			
			localStorage.removeItem("token")
		},
		// Remember me
		setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
    },

		// Mode édition
		editUser: (state, action) => {
			state.editionMode = action.payload.editionMode
		},

		// Erreur connexion
		loginError: (state, action) => {
			state.error = action.payload
		},
	},
})

export const { setUserInfos, setAuthenticating, resetState, setRememberMe, editUser, loginError } = auth.actions
export default auth.reducer
