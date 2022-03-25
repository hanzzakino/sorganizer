import {useEffect} from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '../components/spinner'

//Context
import {useAuth} from '../context/AuthUserContext'
import {useSettings} from '../context/SettingsContext'
import {useFirestoreData} from '../context/FirestoreDataContext'

export default function User() {
	const {settings, toggleTheme} = useSettings()
	const {authUser, loading, signOut, currentTask, dataWriteDone} = useAuth()
	const {userData, getUserDataDone, getUserData} = useFirestoreData()
	const router = useRouter()

	useEffect(() => {
		console.log('effect',loading,authUser)
		if(!loading &&  !authUser && dataWriteDone){
			router.push('/user/sign-in')
		} 
		if (!loading &&  authUser) {
			console.log('getssss',loading,authUser)
			getUserData()
		}
	}, [authUser, loading, dataWriteDone])


	const backClick = () => {
		router.push('/user/dashboard')
	}


	return userData && authUser && !loading ? (
		<>
			<Head>
		    	<title>Profile | SOrganizer</title>
		    	<link rel='icon' href='/favicon.svg' />
		  	</Head>
			<ToastContainer />
			<div className={settings.general.theme+'-bg'}></div>

			<main className={'user-area '+settings.general.theme+'-fgcolor'}>
				<div className="container ">
					<div
					className='userpage-backbtn'
					onClick={backClick}
					>
						<p><i className='bi bi-chevron-left'/> Dashboard</p>
					</div>
					{authUser.photoURL===null ?  <div className='userpage-subprofilepic'>{userData.firstname.slice(0,1)}</div>:<img className='userpage-profilepic' src={authUser.photoURL} alt='Profile Picture' width={64} height={64} layout='fill'/>}
					<form>

					</form>
				</div>
		  	</main>

		</>
		):(<Spinner theme={settings.general.theme} currentTask={currentTask}/>)
}