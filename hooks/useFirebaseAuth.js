import { useState, useEffect } from 'react'
import '../firebase.config'
import {
	getAuth, 
	signInWithEmailAndPassword, 
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
	updateProfile
} from 'firebase/auth'

import {db} from '../firebase.config'
import {
	setDoc,
	getDoc,
	doc,
	serverTimestamp
} from 'firebase/firestore'

import { useRouter } from 'next/router'

import { toast } from 'react-toastify'

const formatAuthUser = (user) => ({
	...user
})

export default function useFirebaseAuth() {
	const [authUser, setAuthUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const [dataWriteDone, setDataWriteDone] = useState(true)
	const [currentTask, setCurrentTask] = useState('Loading')

	const authStateChanged = async (authState) => {
		//console.log('auth state is change to ',authState)
		setCurrentTask('Loading')
		if(!authState) {
			setAuthUser(null)
			if(dataWriteDone){
				setLoading(false)
			}
			return
		}
		setLoading(true)
		var formattedUser = formatAuthUser(authState)
		setAuthUser(formattedUser)
		if(dataWriteDone){
			setLoading(false)
		}
		setCurrentTask('')
	}

	//Auth

	// auth/{} Error Messages
	const parseErrorMessage = (errMessage, theme) => {
		let message = null
		let attributes = null
		switch (errMessage) {
			case 'auth/user-not-found':
				message = 'Invalid Username'
				attributes = {
					position : 'top-right',
					autoClose : 5000,
					theme : theme,
					type : 'error',
					hideProgressBar : true
				}
				return {message,attributes}
				break;
			case 'auth/wrong-password':
				message = 'Invalid Password'
				attributes = {
					position : 'top-right',
					autoClose : 5000,
					theme : theme,
					type : 'error',
					hideProgressBar : true
				}
				return {message,attributes}
				break;
			case 'auth/too-many-requests':
				message = 'Too many Log in attempts. Please try again later'
				attributes = {
					position : 'top-right',
					autoClose : 5000,
					theme : theme,
					type : 'error',
					hideProgressBar : true
				}
				return {message,attributes}
				break;
			case 'auth/weak-password':
				message = 'Password must be at least 8 characters'
				attributes = {
					position : 'top-right',
					autoClose : 5000,
					theme : theme,
					type : 'error',
					hideProgressBar : true
				}
				return {message,attributes}
				break;
			case 'auth/internal-error':
				message = 'Error. Please fill up all fields'
				attributes = {
					position : 'top-right',
					autoClose : 5000,
					theme : theme,
					type : 'error',
					hideProgressBar : true
				}
				return {message,attributes}
				break;
			case 'auth/account-exists-with-different-credential':
				message = 'An error occured. Could not link credentials to existing user'
				attributes = {
					position : 'top-right',
					autoClose : 5000,
					theme : theme,
					type : 'error',
					hideProgressBar : true
				}
				return {message,attributes}
				break;
			default:
				message = 'An error occured - '+errMessage
				attributes = {
					position : 'top-right',
					autoClose : 5000,
					theme : theme,
					type : 'error',
					hideProgressBar : true
				}
				return {message,attributes}
				break;
		}
	}

	const signInEmail = async (email, password, theme) => {
		try {
			const auth = getAuth()
			const userCredential = await signInWithEmailAndPassword(auth, email, password)

			if(userCredential.user){
				router.push('/user')
			}
		} catch(e) {
			const {message,attributes} = parseErrorMessage(e.code, theme)
			toast(message,attributes)
		}
	}

	const signUpEmail = async (firstname, lastname, email, password, formData, theme) => {
		try {
			setDatawWriteDone(false)
			const auth = getAuth()
			const userCredential = await createUserWithEmailAndPassword(auth, email, password)
			const user = userCredential.user
			updateProfile(auth.currentUser, {
				displayName : firstname+' '+lastname
			})
			//form data copy
			const storageFormData = {...formData}
			delete storageFormData.password
			delete storageFormData.confirmpassword
			storageFormData.timestamp = serverTimestamp()
			//add modified formdata to firestore db
			await setDoc(doc(db,'users',user.uid), storageFormData)
			router.push('/user')
		} catch(e) {
			const {message,attributes} = parseErrorMessage(e.code, theme)
			toast(message,attributes)
		} finally {
			setDatawWriteDone(true)
			setLoading(false)
		}
	}

	const resetPassword = async (email, theme) => {
		try {
			const auth = getAuth()
			await sendPasswordResetEmail(auth, email)
			toast.success('Email was Sent',{autoClose : false, theme : theme})
		} catch(e) {
			const {message,attributes} = parseErrorMessage(e.code, theme)
			toast(message,attributes)
		}
	}

	const googleOauth = async (theme) => {
	    try {
	    	setDataWriteDone(false)
	    	setCurrentTask('Signing in using Google')
	    	const auth = getAuth()
	    	const provider = new GoogleAuthProvider()
	    	const result = await signInWithPopup(auth, provider)
	    	const user = result.user

	    	const docRef = doc(db, 'users', user.uid)
	    	const docSnap = await getDoc(docRef)

	    	if(!docSnap.exists()){
	    		await setDoc(doc(db,'users',user.uid), {
		    		firstname : String(user.displayName.split(' ').slice(0,-1).join(' ')),
					lastname : String((user.displayName.split(' ').slice(-1))[0]),
					email : user.email,
					timestamp : serverTimestamp()
				})
				//console.log('PUSHED 123',loading,authUser)
				router.push('/user')
	    	} else {
	    		//console.log('PUSHED 12',loading,authUser)
	    		router.push('/user')
	    	}
	    } catch(e) {
	    	console.log(e)
	    	const {message,attributes} = parseErrorMessage(e.code, theme)
	    	toast(message,attributes)
	    } finally {
	    	setCurrentTask('')
	    	setDataWriteDone(true)
	    	setLoading(false)
	    }
	}

	const facebookOauth = async (theme) => {
	    try {
	    	setDataWriteDone(false)
	    	setCurrentTask('Signing in using Facebook')
	    	const auth = getAuth()
	    	const provider = new FacebookAuthProvider()
	    	const result = await signInWithPopup(auth, provider)
	    	const user = result.user

	    	const docRef = doc(db, 'users', user.uid)
	    	const docSnap = await getDoc(docRef)

	    	if(!docSnap.exists()){
	    		
	    		await setDoc(doc(db,'users',user.uid), {
		    		firstname : String(user.displayName.split(' ').slice(0,-1).join(' ')),
					lastname : String((user.displayName.split(' ').slice(-1))[0]),
					email : user.email,
					timestamp : serverTimestamp()
				})
				router.push('/user')
	    	} else {
	    		router.push('/user')
	    	}

	    } catch(e) {
	    	console.log(e)
	    	const {message,attributes} = parseErrorMessage(e.code, theme)
	    	toast(message,attributes)
	    } finally {
	    	setCurrentTask('')
	    	setDataWriteDone(true)
	    	setLoading(false)
	    }
	}

	const signOut = () => {
		const auth = getAuth()
		auth.signOut()
	}

	useEffect(() => {
		const auth = getAuth()
		const unsubscribe = auth.onAuthStateChanged(authStateChanged)
		return () => unsubscribe()
	}, [])

	return {
		authUser,
		loading,
		signInEmail,
		signUpEmail,
		googleOauth,
		facebookOauth,
		signOut,
		resetPassword,
		currentTask,
		dataWriteDone
	}
}