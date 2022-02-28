import { useState, useEffect } from 'react'
import '../firebase.config'
import {getAuth} from 'firebase/auth'

const formatAuthUser = (user) => ({
	uid: user.uid,
	displayName: user.displayName,
	email: user.email
})

export default function useFirebaseAuth() {
	const [authUser, setAuthUser] = useState(null)
	const [loading, setLoading] = useState(true)

	const authStateChanged = async (authState) => {
		if(!authState) {
			setAuthUser(null)
			setLoading(false)
			return
		}
		setLoading(true)
		var formattedUser = formatAuthUser(authState)
		setAuthUser(formattedUser)
		setLoading(false)
	}

	const auth = getAuth()

	const clear = () => {
		setAuthUser(null)
		setLoading(true)
	}

	const signOut = () => {
		auth.signOut().then(clear)
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(authStateChanged)
		return () => unsubscribe()
	}, [])

	return {
		authUser,
		loading,
		signOut
	}
}