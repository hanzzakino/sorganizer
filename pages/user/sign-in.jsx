import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../../components/navbar'
import Spinner from '../../components/spinner'
import OauthButton from '../../components/oauthButton'

import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

//Context
import {useAuth} from '../../context/AuthUserContext'
import {useTheme} from '../../context/ThemeContext'


export default function SignIn() {
	const {theme} = useTheme()
	const {authUser, loading, oauthloading} = useAuth()
	const router = useRouter()
	const [showPassword , setshowPassword] = useState(false)
	const [formData, setFormData] = useState({
		email : '',
		password : ''
	})
	const {email, password} = formData
	
	useEffect(() => {
		if(!oauthloading && !loading &&  authUser){
			console.log('push45')
			router.push('/user')
		}
	}, [authUser, loading])

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id] : e.target.value
		}))
	}
	const parseErrorMessage = (errMessage) => {
		let message = null
		let attributes = null
		switch (errMessage) {
			case 'Firebase: Error (auth/user-not-found).':
				message = 'Invalid Username/Password'
				attributes = {
					position : 'top-right',
					autoClose : 5000,
					theme : theme,
					type : 'error',
					hideProgressBar : true
				}
				return {message,attributes}
				break;
			case 'Firebase: Error (auth/wrong-password).':
				message = 'Invalid Username/Password'
				attributes = {
					position : 'top-right',
					autoClose : 5000,
					theme : theme,
					type : 'error',
					hideProgressBar : true
				}
				return {message,attributes}
				break;
			case 'Firebase: Access to this account has been temporarily disabled due to many failed signin attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).':
				message = 'Too many Log in attempts. Please try again later'
				attributes = {
					position : 'top-right',
					autoClose : 5000,
					theme : theme,
					type : 'error',
					hideProgressBar : true
				}
				return {message,attributes}
				break;
			default:
				message = 'An error occured'
				attributes = {
					position : 'top-right',
					autoClose : 5000,
					theme : theme,
					type : 'error',
					hideProgressBar : true
				}
				return {message,attributes}
				break;
		}
	}

	const onSubmit = async (e) => {
		e.preventDefault()
		try {
			const auth = getAuth()
			const userCredential = await signInWithEmailAndPassword(auth, email, password)

			if(userCredential.user){
				console.log('push3')
				router.push('/user')
			}
		} catch(e) {
			const {message,attributes} = parseErrorMessage(e.message)
			toast(message,attributes)
		}
		
	}

  	return (
	  	!loading &&  !authUser ? (<div>
	  		<div className={theme+'-bg'}></div>
	  		<Head>
	        	<title>Sign in | SOrganizer</title>
	      	</Head>
	  		<ToastContainer/>

	  		<div className="container">

	  			<div className="row fill-screen flex horizontal-center">
	  				
	  				<div className={'column flex vertical-center '+theme+'-fgcolor'}>
	  					<h1>SOrganizer</h1>
	  					<br />
	  				</div>
	  				<div className='column flex vertical-center'>
	  					<div className={'flex vertical-center fit-width  card '+theme+'-bg3color'}>
		  					<h1 className={theme+'-fgcolor form-label'}>Sign in</h1>
		  					<br />
		  					<form onSubmit={onSubmit}>
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
								<div className='input-field'>
									<i className='bi bi-lock-fill field-icon'></i>
									<input 
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
								<div className="flex vertical-center">
									<span><Link href='/user/forgot-password'><a className={theme+'-fg2color'}>Forgot your Password?</a></Link></span>
									<br />
									<button className={'btn '+theme+'-accentbgcolor'}>Sign in</button>
								</div>
							</form>
							<p className={theme+'-fg2color'}>or Sign in with</p>
							<OauthButton />
							<br />
						</div>
				
	  					<div className={'fit-width '+theme+'-fg2color'}>
	  						<br />
	  						<span>{'Don\'t have an account? '}&nbsp;<Link href='/user/sign-up'><a className={theme+'-fg2color'}>Sign up</a></Link></span>
	  					</div>
	  				</div>

	  			</div>

	  		</div>	

	  		{/*<main className='fill-screen horizontal-center flex'>
	  			<div className='container flex vertical-center'>
	  				<div className={'fit-width  card '+theme+'-bg3color'}>
	  					<div className='row'>
	  						<div className="column flex horizontal-center">
	  							
		  						<br />
	  						</div>
		  				</div>
						<div className='row'>
							<div className="column">
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
									<div className='input-field'>
										<i className='bi bi-lock-fill field-icon'></i>
										<input 
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
									<span><Link href='/user/forgot-password'><a className={theme+'-fg2color'}>Forgot your Password?</a></Link></span>
									<br />
									<button className={'btn '+theme+'-accentbgcolor'}>Sign in</button>
								</form>
							</div>
						</div>
						<div className='row'>
							<div className="column vertical-center flex">
								<p className={theme+'-fg2color'}>or Sign in with</p>
								<OauthButton />
	  						</div>
	  					</div>
	  					<br />
	  				</div>
					<br />
	  				<div className='row'>
	  					<div className={'column fit-width '+theme+'-fg2color'}>
	  						<span>{'Don\'t have an account? '}&nbsp;<Link href='/user/sign-up'><a className={theme+'-fg2color'}>Sign up</a></Link></span>
	  					</div>	
	  				</div>

				</div>
			</main>*/}
			
	  	</div>):(<Spinner theme={theme}/>)
  	)
}
