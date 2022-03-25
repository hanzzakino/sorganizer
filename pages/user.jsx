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
					<div className='userpage-backbtn' onClick={handleBackClick}>
						<p><i className='bi bi-chevron-left'/> Dashboard</p>
					</div>					
					
					<form>
						<div className='user-data'>
							<button className={'user-editmode-toggle '+settings.general.theme+'-fgcolor'} onClick={editModeChange}><i className='bi bi-pencil-square' /></button>
							{authUser.photoURL===null ?  <div className='userpage-subprofilepic'>{userData.firstname.slice(0,1)}</div>:<img className='userpage-profilepic' src={authUser.photoURL} alt='Profile Picture' width={64} height={64} layout='fill'/>}
							<div className='user-data-name'>
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
							</div>

							<div>
								{editMode ?
								(
									<button className='btn' onClick={handleSave}>Save</button>
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