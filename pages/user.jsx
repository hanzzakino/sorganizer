import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '../components/spinner'

//initialize firebase app using the firebase.config file
import {db} from '../firebase.config'
import {doc, getDoc, onSnapshot} from 'firebase/firestore'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

//Context
import {useAuth} from '../context/AuthUserContext'
import {useSettings} from '../context/SettingsContext'


export default function User() {
	const {settings, toggleTheme, setLocalSettings} = useSettings()
	const {authUser, loading, signOut, currentTask, dataWriteDone} = useAuth()
	const [gettingUserDB, setGettingUserDB] = useState(true)
	const router = useRouter()
	const [userData, setUserData] = useState({
		firstname : '',
		lastname : '',
		email : '',
		timestamp : null,
		settings : null
	})
	const {firstname, lastname, email} = userData

	useEffect(() => {
		if(!loading &&  !authUser && dataWriteDone){
			router.push('/user/sign-in')
		} else if(authUser && !loading){
			getUserData()
		}
	}, [authUser, loading, dataWriteDone])
	
	const getUserData = async () => {
		try {
			setGettingUserDB(true)
			const docRef = doc(db,'users',authUser.uid)
			const docSnap = await getDoc(docRef)
			if(docSnap.exists()){
				setLocalSettings()
				setUserData(docSnap.data())
				setGettingUserDB(false)
			}
			
		} catch(e) {
			toast('An error occured while getting Database data', {
					position : 'top-right',
					autoClose : 5000,
					theme : settings.general.theme,
					type : 'error',
					hideProgressBar : true
			})
			setGettingUserDB(false)
		}
	}

	

	return authUser && !loading ? (
		<>
		<Head>
	    	<title>Dashboard | SOrganizer</title>
	    	<link rel='icon' href='/favicon.svg' />
	  	</Head>
		<div className={settings.general.theme+'-bg'}></div>
		<div className={settings.general.theme+'-fgcolor'} align='center'>
			 
				<div className='container'>

					<div className='horizontal-center flex row'>
						{gettingUserDB ? <Spinner theme={settings.general.theme} spinnerOnly/>:<h1>{firstname+' '+lastname}</h1>}
					</div>

					<div className='horizontal-center row'>
						<img src={authUser.photoURL} alt='profile picture' />
					</div>

					<div className='horizontal-center flex row'>
						{gettingUserDB ? (<Spinner theme={settings.general.theme} spinnerOnly/>):(<p>
						First Name : {userData.firstname}
						<br />
						Last Name : {userData.lastname}
						<br />
						Email : {userData.email}
						<br />
						Date joined : {userData.timestamp.seconds}
						</p>)}
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