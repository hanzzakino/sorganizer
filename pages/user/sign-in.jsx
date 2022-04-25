import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
//components
import Navbar from '../../components/navbar'
import Spinner from '../../components/spinner'
import OauthButton from '../../components/oauthButton'
import { ToastContainer, toast } from 'react-toastify'


//Context
import {useAuth} from '../../context/AuthUserContext'
import {useSettings} from '../../context/SettingsContext'


export default function SignIn() {
	const {settings} = useSettings()
	const {authUser, loading, signInEmail, currentTask, dataWriteDone} = useAuth()
	const router = useRouter()
	const [showPassword , setshowPassword] = useState(false)
	const [emptyfield, setEmptyfield] = useState({
		emailEmpty : false,
		passwordEmpty: false
	})
	const [formData, setFormData] = useState({
		email : '',
		password : ''
	})
	const {email, password} = formData
	
	//This checks if there are any signed in user
	// then redirects to sign in if no user is signed in
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

	//TODO check if the fields are filled before passing to firebase
	const onSubmit = (e) => {
		e.preventDefault()
		signInEmail(email, password, settings)
		.then((emptyfields) => {
				setEmptyfield(emptyfields)
			}
		)
	}

  	return (
	  	!loading &&  !authUser ? (<div>
	  		<div className={settings.general.theme+'-bg'}></div>
	  		<Head>
	        	<title>Sign in | SOrganizer</title>
	        	<link rel='icon' href='/favicon.svg' />
	      	</Head>
	  		<ToastContainer/>

	  		<div className='container'>

	  			<div className='row fill-screen flex horizontal-center'>
	  				
	  				<div className={'column flex vertical-center '+settings.general.theme+'-fgcolor'}>
	  					<Image src='/img/logo/sorganizer-logo-main.svg' alt='sorganizer' height='50px' width='50px'></Image>
	  					<h1>SOrganizer</h1>
	  					<br />
	  				</div>
	  				<div className='column flex vertical-center'>
	  					<div className={'flex vertical-center fit-width  card '+settings.general.theme+'-bg2color'}>
		  					<h1 className={settings.general.theme+'-fgcolor form-label'}>Sign in</h1>
		  					<br />
		  					<form onSubmit={onSubmit}>
								<div className='input-field'>
									<i className='bi bi-person-fill field-icon' />
									<input
									 className = {emptyfield.emailEmpty ? 'empty-field-error':''}
									 type='email' 
									 placeholder='Email'
									 id='email'
									 value={email}
									 onChange={onChange}
									 autoComplete='username' 
									 />
								</div>
								<div className='input-field'>
									<i className='bi bi-lock-fill field-icon'></i>
									<input 
									className = {emptyfield.passwordEmpty ? 'empty-field-error':''}
									type={showPassword ? 'text':'password'} 
									placeholder='Password' 
									id='password'
									value={password}
									onChange={onChange}
									autoComplete='current-password'/>
									<i 
									className={showPassword ? 'bi bi-eye field-toggle':'bi bi-eye-slash field-toggle'} 
									onClick={() => setshowPassword((prevState) => !prevState)}/>
								</div>
								<div className='flex vertical-center'>
									<span><Link href='/user/forgot-password'><a className={settings.general.theme+'-fg2color'}>Forgot your Password?</a></Link></span>
									<br />
									<button className={'btn '+settings.general.theme+'-accentbgcolor'}>Sign in</button>
								</div>
							</form>
							<p className={settings.general.theme+'-fg2color'}>or Sign in with</p>
							<OauthButton />
							<br />
						</div>
				
	  					<div className={'fit-width '+settings.general.theme+'-fg2color'}>
	  						<br />
	  						<span>{'Don\'t have an account? '}&nbsp;<Link href='/user/sign-up'><a className={settings.general.theme+'-fg2color'}>Sign up</a></Link></span>
	  					</div>
	  				</div>
	  			</div>
	  		</div>	

	  	</div>):(<Spinner theme={settings.general.theme} currentTask={currentTask}/>)
  	)
}
