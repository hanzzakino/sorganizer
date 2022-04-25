import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify'
import Spinner from '../../components/spinner'
import LoadingNotify from '../../components/loadingNotify'
import Navbar from '../../components/navbar'
import NotificationBar from '../../components/notificationBar'
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
	const {currentView, currentTitle} = useDashboardContext()
	const {firestoreLoading, getDataDone, getSubjects, subjects, userData, getUserDataDone, getUserData} = useFirestoreData()
	const {settings, setLocalSettings} = useSettings()
	const {authUser, loading, currentTask, dataWriteDone} = useAuth()
	const router = useRouter()
	const [navbarCollapsed, setNavbarCollapsed] = useState(true)
	const [pageScrollTop, setPageScrollTop] = useState(true)
	const [scrollY, setScrollY] = useState(0)

	useEffect(() => {
		if(!loading &&  !authUser && dataWriteDone){
			router.push('/user/sign-in')
		} 
		if (!loading &&  authUser) {
			if(subjects.length===0){
				getSubjects()
			}
			getUserData()
			setLocalSettings()
		}
	}, [authUser, loading, dataWriteDone])

	useEffect(() => {
		const handleScroll = () => {
			if(window.scrollY > 5) {
				setPageScrollTop(false)
			} else {
				setPageScrollTop(true)
			}
			setScrollY(window.scrollY)
		}
		handleScroll()
		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	},[])
	
	const toggleNavbar = () => {
		setNavbarCollapsed(!navbarCollapsed)
	}

	const showView = () => {
		switch(currentView){
			case 'subjects':
				return <Subjects theme={settings.general.theme} subjects={subjects} navbarCollapsed={navbarCollapsed}/>
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
				return <div className=""></div>
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

	  	<LoadingNotify hidden={!firestoreLoading}/>

	  	<Navbar theme={settings.general.theme} navbarCollapsed={navbarCollapsed}/>
	  	<NotificationBar navbarCollapsed={navbarCollapsed} userData={userData} scrolled={!pageScrollTop} panelTitle={currentTitle} authUser={authUser}/>
	  	<button className={'btn-navbarToggle '+(navbarCollapsed ? 'nvbtg_collapsed ':'')+' '+'dark-fgcolor'} onClick={toggleNavbar}><i className='bi bi-chevron-left'/></button>

	  	<main className={'main-area'+(navbarCollapsed ? ' ma_expanded':'')}>
	  		{showView()}
	  	</main>

		</>
		):(<Spinner theme={settings.general.theme} currentTask={currentTask}/>)
}