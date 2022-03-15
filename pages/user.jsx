import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '../components/spinner'
import Navbar from '../components/navbar'

//initialize firebase app using the firebase.config file
import {db} from '../firebase.config'
import {doc, getDoc, onSnapshot} from 'firebase/firestore'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

//Context
import {useAuth} from '../context/AuthUserContext'
import {useSettings} from '../context/SettingsContext'
import {useFirestoreData} from '../context/FirestoreDataContext'

export default function User() {
	const {settings, toggleTheme, setLocalSettings} = useSettings()
	const {authUser, loading, signOut, currentTask, dataWriteDone} = useAuth()
	const {userData, getUserDataDone, getUserData} = useFirestoreData()
	const router = useRouter()

	useEffect(() => {
		if(!loading &&  !authUser && dataWriteDone){
			router.push('/user/sign-in')
		} 
	}, [authUser, loading, dataWriteDone])
	

	

	return userData && authUser && !loading ? (
		<>
		<Head>
	    	<title>Profile | SOrganizer</title>
	    	<link rel='icon' href='/favicon.svg' />
	  	</Head>
		
		</>
		):(<Spinner theme={settings.general.theme} currentTask={currentTask}/>)
}