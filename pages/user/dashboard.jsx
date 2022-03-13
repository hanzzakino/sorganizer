import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '../../components/spinner'
import Navbar from '../../components/navbar'

//initialize firebase app using the firebase.config file
import {db} from '../../firebase.config'
import {doc, getDoc, onSnapshot} from 'firebase/firestore'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

//Context
import {useAuth} from '../../context/AuthUserContext'
import {useSettings} from '../../context/SettingsContext'
import {useFirestoreData} from '../../context/FirestoreDataContext'


export default function Dashboard() {
	const {getDataDone, getSubjects, subjects} = useFirestoreData()
	const {settings, toggleTheme, setLocalSettings} = useSettings()
	const {authUser, loading, signOut, currentTask, dataWriteDone} = useAuth()
	const router = useRouter()


	useEffect(() => {
		if(!loading &&  !authUser && dataWriteDone && getDataDone){
			router.push('/user/sign-in')
		} else if(authUser && !loading){
			getSubjects()
		}
	}, [authUser, loading, dataWriteDone, getDataDone])
	
	

	return authUser && !loading && getDataDone ? (
		<>
		<Head>
	    	<title>Dashboard | SOrganizer</title>
	    	<link rel='icon' href='/favicon.svg' />
	  	</Head>
		<div className={settings.general.theme+'-bg'}></div>
		<Navbar theme={settings.general.theme}/>
		<br />
		<div className={settings.general.theme+'-fgcolor container'}>
			{subjects.map((subject) => 
				<ul>
					<li>{subject.data.code}</li>
					<li>---> {subject.data.name}</li>
					<li>---> Prof. {subject.data.teacher}</li>
					<li>---> {subject.data.scheduleDay}</li>
					<li>---> {subject.data.scheduleTimeFrom} to {subject.data.scheduleTimeTo}</li>
				</ul>
				)}
		</div>

		</>
		):(<Spinner theme={settings.general.theme} currentTask={currentTask}/>)
}