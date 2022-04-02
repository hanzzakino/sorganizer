import {useEffect, useState} from 'react'
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
	const {userData, getUserDataDone, getUserData, setUsername} = useFirestoreData()
	const router = useRouter()
	const [editMode, setEditMode] = useState(false)
	const [formData, setFormData] = useState({
		firstname : '',
		lastname : ''
	})

	const {firstname, lastname} = formData

	useEffect(()=>{
		if(userData)
		{
			setFormData({
				firstname : userData.firstname,
				lastname : userData.lastname
			})
		}
	},[userData])

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


	const handleBackClick = () => {
		router.push('/user/dashboard')
	}

	const handleSave = (e) => {
		e.preventDefault()
		setUsername(firstname,lastname)
		setEditMode(false)
	}


	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id] : e.target.value
		}))
	}

	const editModeChange = (e) => {
		e.preventDefault()
		setFormData({
			firstname : userData.firstname,
			lastname : userData.lastname
		})
		setEditMode((prevState) => !prevState)
	}

	const timestampToDate = (timestamp) => {
		const ts = timestamp.toDate()
		const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		const weekDayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		const date =({
			hour : ts.getHours(),
			minute : ts.getMinutes(),
			seconds : ts.getSeconds(),
			month : ts.getMonth(),
			monthWord : monthList[ts.getMonth()],
			day : ts.getDate(),
			dayOfWeek : ts.getDay(),
			dayOfWeekWord : weekDayList[ts.getDay()],
			year : ts.getFullYear()
		})

		return date
	}


	return userData && authUser && !loading && getUserDataDone ? (
		<>
			<Head>
		    	<title>Profile | SOrganizer</title>
		    	<link rel='icon' href='/favicon.svg' />
		  	</Head>
			<ToastContainer />
			<div className={settings.general.theme+'-bg'}></div>

			<main className={'user-area '+settings.general.theme+'-fgcolor'}>
				<div className="container ">
					<div className='userpage-backbtn' onClick={handleBackClick}>
						<p><i className='bi bi-chevron-left'/> Dashboard</p>
					</div>					
					
					<form>
						<div className='user-data'>
							<button className={'user-editmode-toggle '+settings.general.theme+'-fgcolor '+(editMode ? 'dark-accentfgcolor':null)} onClick={editModeChange}><i className='bi bi-pencil-square' /></button>
							{authUser.photoURL===null ?  <div className='userpage-subprofilepic'>{userData.firstname.slice(0,1)}</div>:<img className='userpage-profilepic' src={authUser.photoURL} alt='Profile Picture' width={64} height={64} layout='fill'/>}
							
							<div align='center'>
								{editMode ?
									(
										<>
											<input 
											id='firstname'
											value={firstname}
											onChange={onChange}
											autoComplete='first-name' 
											className='user-data-name-form'
											type='text' 
											placeholder='First name'/>
											<input 
											id='lastname'
											value={lastname}
											onChange={onChange}
											autoComplete='last-name'
											className='user-data-name-form'
											type='text' 
											placeholder='Last name'/>
										</>
									):
									(
										<p className='user-data-name'>{userData.firstname} {userData.lastname}</p>
									)
								}

								{editMode ? null:<p>
									{userData.email} 
									<br />
									<br />
									<br />
									<br />
									<br />
									{'Date joined: '+(timestampToDate(userData.timestamp).monthWord)+' '+timestampToDate(userData.timestamp).day+', '+timestampToDate(userData.timestamp).year}
									</p>
								}
							</div>
							
							<div>
								{editMode ?
								(
									<button className='user-save-button' onClick={handleSave}>Save</button>
								):
								(
									null
								)
								}
							</div>
						</div>
					</form>

				</div>
		  	</main>

		</>
		):(<Spinner theme={settings.general.theme} currentTask={currentTask}/>)
}