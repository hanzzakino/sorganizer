import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '../../components/spinner'
import Navbar from '../../components/navbar'

import Subjects from '../../components/dashboard/subjects'

//initialize firebase app using the firebase.config file
import {db} from '../../firebase.config'
import {doc, getDoc, onSnapshot} from 'firebase/firestore'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

//Context
import {useAuth} from '../../context/AuthUserContext'
import {useSettings} from '../../context/SettingsContext'
import {useFirestoreData} from '../../context/FirestoreDataContext'
import {useDashboardContext} from '../../context/DashboardContext'


export default function Dashboard() {
	const {currentView} = useDashboardContext()
	const {getDataDone, getSubjects, subjects, userData, getUserDataDone, getUserData, clearData} = useFirestoreData()
	const {settings, toggleTheme, setLocalSettings} = useSettings()
	const {authUser, loading, signOut, currentTask, dataWriteDone} = useAuth()
	const router = useRouter()



	const [navbarCollapsed, setNavbarCollapsed] = useState(false)


	useEffect(() => {
		console.log('effect',loading,authUser)
		if(!loading &&  !authUser && dataWriteDone){
			router.push('/user/sign-in')
		} 
		if (!loading &&  authUser) {
			console.log('getssss',loading,authUser)
			getSubjects()
			getUserData()
			setLocalSettings()
		}
	}, [authUser, loading, dataWriteDone])
	

	const toggleNavbar = () => {
		setNavbarCollapsed(!navbarCollapsed)
	}

	const showView = () => {
		switch(currentView){
			case 'subjects':
				return <Subjects theme={settings.general.theme} subjects={subjects}/>
				break
			case 'todo':
				return <p>todo</p>
				break
			case 'schedule':
				return <p>schedule</p>
				break
			case 'notes':
				return <p>notes</p>
				break
			case 'settings':
				return <p>settings</p>
				break
			default:
				return <Subjects theme={settings.general.theme} subjects={subjects}/>
				break
		}
	}

	return authUser && !loading && getDataDone && getUserDataDone ? (
		<>
		<Head>
	    	<title>Dashboard | SOrganizer</title>
	    	<link rel='icon' href='/favicon.svg' />
	  	</Head>
	  	<ToastContainer/>
	  	<div className={settings.general.theme+'-bg'}></div>


	  	<Navbar theme={settings.general.theme} collapsed={navbarCollapsed}/>



	  	<main className={'main-area'+(navbarCollapsed ? '-expanded':'')}>
	  		<h1>Hi!, {userData.firstname+' '+userData.lastname}</h1>
	  		<button className={'btn-navbarToggle'+(navbarCollapsed ? '-collapsed':'')+' '+settings.general.theme+'-fgcolor'} onClick={toggleNavbar}><i className='bi bi-chevron-left'/></button>
	  		
	  		{showView()}



	  		
	  	</main>
		</>
		):(<Spinner theme={settings.general.theme} currentTask={currentTask}/>)
}