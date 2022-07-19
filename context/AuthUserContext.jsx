//Global context for the authentication

import { createContext, useContext, Context } from 'react'
import useFirebaseAuth from '../hooks/useFirebaseAuth'

const authUserContext = createContext({
	authUser : null,
	loading: true,
	signInEmail: null,
	signUpEmail: null,
	googleOauth: null,
	facebookOauth: null,
	signOut: null,
	resetPassword: null,
	currentTask: null,
	dataWriteDone: false
})

export function AuthUserProvider({children}) {
	//Pass the auth methods from useFirebaseAuth hook to use in the AuthUserProvider context
	//could have created the methods in here like other contexts but the methods are
	//initially created in the useFirebaseAuth()
	const authMethods = useFirebaseAuth()
	return <authUserContext.Provider value={authMethods}>{children}</authUserContext.Provider>
}

//Custom hook for accessing authUser and loading states
export const useAuth = () => useContext(authUserContext)