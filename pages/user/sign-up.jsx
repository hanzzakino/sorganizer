import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

//Components
import Navbar from '../../components/navbar'
import Spinner from '../../components/spinner'
import OauthButton from '../../components/oauthButton'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//Context
import {useAuth} from '../../context/AuthUserContext'
import {useSettings} from '../../context/SettingsContext'


export default function SignUp() {
	const {settings} = useSettings()
	const {authUser, loading, signUpEmail, currentTask, dataWriteDone} = useAuth()
	const router = useRouter()
	const [showPassword , setshowPassword] = useState(false)
	const [emptyfield, setEmptyfield] = useState({
		firstnameEmpty : false,
		lastnameEmpty : false,
		emailEmpty : false, 
		passwordEmpty : false,
		confirmpasswordEmpty: false
	})
	const [formData, setFormData] = useState({
		firstname : '',
		lastname : '',
		email : '',
		password : '',
		confirmpassword : ''
	})
	const {firstname, lastname, email, password, confirmpassword} = formData
	
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

	//Register user to google firebase authentication
	//TODO Make sure that before passing to db all fileds are filled up
	const onSubmit = (e) => {
		e.preventDefault()
		signUpEmail(firstname, lastname, email, password, confirmpassword, formData, settings)
		.then((emptyfields) => {
			setEmptyfield(emptyfields)
		})
	}

  	return (
	  	!loading &&  !authUser ? (<div>
	  		<div className={settings.general.theme+'-bg'}></div>
	  		<Head>
	        	<title>Sign up | SOrganizer</title>
	        	<link rel='icon' href='/favicon.svg' />
	      	</Head>
	  		<ToastContainer />
	  		<br />

	  		<div className="container">

	  			<div className="row fill-screen flex horizontal-center">

	  				<div className='column flex vertical-center'>
		  				<h1 className={settings.general.theme+'-fgcolor'}>SOrganizer</h1>
		  				<br />
	  					<div className={'flex vertical-center fit-width  card '+settings.general.theme+'-bg2color'}>
		  					<h1 className={settings.general.theme+'-fgcolor form-label'}>Create an Account</h1>
		  					<br />
		  					<form onSubmit={onSubmit}>
								<div className='input-field-name'>
									<input 
									 className = {emptyfield.firstnameEmpty ? 'empty-field-error':''}
									 type='text' 
									 placeholder='First Name'
									 id='firstname' 
									 value={firstname}
									 onChange={onChange}
									 autoComplete='first-name' 
									 />
									 <input 
									 className = {emptyfield.lastnameEmpty ? 'empty-field-error':''}
									 type='text' 
									 placeholder='Last Name'
									 id='lastname' 
									 value={lastname}
									 onChange={onChange}
									 autoComplete='last-name' 
									 />
								</div>
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
								<div className='input-field'>
									<i className='bi bi-lock-fill field-icon'></i>
									<input 
									className = {emptyfield.confirmpasswordEmpty ? 'empty-field-error':''}
									type={showPassword ? 'text':'password'} 
									placeholder='Confirm Password' 
									id='confirmpassword' 
									value={confirmpassword}
									onChange={onChange}
									autoComplete='confirm-password'/>
									<i 
									className={showPassword ? 'bi bi-eye field-toggle':'bi bi-eye-slash field-toggle'} 
									onClick={() => setshowPassword((prevState) => !prevState)}/>
								</div>	
								<div className="flex vertical-center">
									<button className={'btn '+settings.general.theme+'-accentbgcolor'}>Sign up</button>
								</div>
							</form>
							<p className={settings.general.theme+'-fg2color'}>or Sign up with</p>
							<OauthButton />
							<br />
						</div>
				
	  					<div className={'fit-width '+settings.general.theme+'-fg2color'}>
	  						<br />
	  						<span>{'Already have an account? '}&nbsp;<Link href='/user/sign-in'><a className={settings.general.theme+'-fg2color'}>Sign in</a></Link></span>
	  						<br />
	  						<br />
	  					</div>
	  				</div>

	  			</div>

	  		</div>	

	  		

	  	</div>):(<Spinner theme={settings.general.theme} currentTask={currentTask}/>)
  	)
}
