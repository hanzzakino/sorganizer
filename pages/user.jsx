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
		} else if(!userData && !getUserDataDone && authUser){
			getUserData()
			setLocalSettings()
		}
	}, [authUser, loading, dataWriteDone, router, userData, getUserDataDone, getUserData, setLocalSettings])
	

	

	return userData && authUser && !loading ? (
		<>
		<Head>
	    	<title>Profile | SOrganizer</title>
	    	<link rel='icon' href='/favicon.svg' />
	  	</Head>
		<div className={settings.general.theme+'-bg'}></div>
		<Navbar theme={settings.general.theme}/>
		<br /><br /><br />
		<div className={settings.general.theme+'-fgcolor'} align='center'>
			 
				<div className='container'>
					<div className='horizontal-center flex row'>
						<h1>Hi! {userData.firstname} {userData.lastname}</h1>
					</div>

					<div className='horizontal-center flex row'>
						<p>{authUser.uid}</p>
					</div>

					<div className='horizontal-center flex row'>
						<p>{JSON.stringify(settings, null, 2)}</p>
					</div>

					<div className='horizontal-center flex row'><button className='btn' onClick={signOut}>Logout</button></div>
					<div className='horizontal-center flex row'><button className='btn' onClick={toggleTheme}>Switch to {settings.general.theme==='dark' ? 'Light':'Dark'} Theme</button></div>
				</div>
			
		</div>
		</>
		):(<Spinner theme={settings.general.theme} currentTask={currentTask}/>)
}