import { createContext, useContext, Context } from 'react'
import useFirebaseAuth from '../hooks/useFirebaseAuth'

const authUserContext = createContext({
	authUser : null,
	displayName : null,
	loading: true
})

export function AuthUserProvider({children}) {
	const auth = useFirebaseAuth()
	return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
}

//Custom hook for accessing authUser and loading states
export const useAuth = () => useContext(authUserContext)