import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

//Components
import Navbar from '../../components/navbar'
import Spinner from '../../components/spinner'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


//Context
import {useAuth} from '../../context/AuthUserContext'
import {useSettings} from '../../context/SettingsContext'

export default function ForgotPassword() {
	const {settings} = useSettings()
	const {authUser, loading, resetPassword, dataWriteDone} = useAuth()
	const router = useRouter()
	const [showPassword , setshowPassword] = useState(false)
	const [formData, setFormData] = useState({
		email : '',
	})
	const {email} = formData

	useEffect(() => {
		if(!loading &&  authUser && dataWriteDone){
			router.push('/user/dashboard')
		}
	}, [authUser, loading, dataWriteDone])

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id] : e.target.value
		}))
	}

	const onSubmit = (e) => {
		e.preventDefault()
		resetPassword(email, settings)
	}

  	return (
	  	!loading &&  !authUser ? (<div>
	  		<div className={settings.general.theme+'-bg'}></div>
	  		<Head>
	        	<title>Reset Password | SOrganizer</title>
	        	<link rel='icon' href='/favicon.svg' />
	      	</Head>
	  		<ToastContainer/>

	  		<main className='fill-screen horizontal-center flex'>

	  			<div className='container flex vertical-center'>
	  				<br />
	  				<h1 className={settings.general.theme+'-fgcolor'}>SOrganizer</h1>
	  				<br />
	  				<div className={'fit-width card '+settings.general.theme+'-bg2color'}>

	  					<div className='row vertical-center'>
		  					<h1 className={settings.general.theme+'-fgcolor form-label'}>Reset Password</h1>
		  					<br />
		  				</div>
		  				
						<div className='row'>
							<form className='form' onSubmit={onSubmit}>
								<div className='input-field'>
									<i className='bi bi-person-fill field-icon' />
									<input 
									 type='email' 
									 placeholder='Email'
									 id='email'
									 value={email}
									 onChange={onChange}
									 autoComplete='username' 
									 />
								</div>
								<button className={'btn '+settings.general.theme+'-accentbgcolor'}>Send Reset Link</button>
								</form>
						</div>

	  				</div>

					<br />
	  				<div className={'row fit-width '+settings.general.theme+'-fg2color'}>
	  					<span>{'Go back to'}&nbsp;<Link href='/user/sign-in'><a className={settings.general.theme+'-fg2color'}>Sign in</a></Link></span>
	  				</div>

				</div>

				
				
			</main>
	  	</div>):(<Spinner theme={settings.general.theme}/>)
  	)
}
