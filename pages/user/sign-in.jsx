
import { useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/navbar'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//initialize firebase app using the firebase.config file
import '../../firebase.config'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'


export default function SignIn() {
	
	const [showPassword , setshowPassword] = useState(false)
	const [formData, setFormData] = useState({
		email : '',
		password : ''
	})

	const {email, password} = formData

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id] : e.target.value
		}))
	}

	const nextrouter = useRouter()

	const parseErrorMessage = (errMessage) => {
		let message = null
		let attributes = null
		switch (errMessage) {
			case 'Firebase: Error (auth/user-not-found).':
				message = 'Invalid Username/Password'
				attributes = {
					position : 'top-right',
					autoClose : 5000,
					theme : 'dark',
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
					theme : 'dark',
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
					theme : 'dark',
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
					theme : 'dark',
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
				nextrouter.push('/user')
			}
		} catch(e) {
			const {message,attributes} = parseErrorMessage(e.message)
			toast(message,attributes)
		}
		
	}

  	return (
	  	<div>
	  		<ToastContainer/>
	  		<main className='fill-screen vertical-center flex'>

	  			<div className="container flex horizontal-center">

	  				<div className='fit-width card dark-bg3color'>

	  					<div className="row horizontal-center">
		  					<h1 className="dark-fgcolor form-signin-label">SOrganizer</h1>
		  					<br />
		  				</div>
		  				
						<div className="row">
							<form className='form-signin' onSubmit={onSubmit}>
								<div className="input-field">
									<i className="bi bi-person-fill field-icon" />
									<input 
									 type="email" 
									 placeholder='Email'
									 id='email'
									 value={email}
									 onChange={onChange}
									 autoComplete='username' 
									 />
								</div>
								<div className="input-field">
									<i className="bi bi-lock-fill field-icon"></i>
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
								
								
								
								<span><Link href='/user/forgot-password'><a className='dark-fg2color'>Forgot your Password?</a></Link></span>
								<br />
								<button className='btn-signin dark-accentbgcolor'>Sign in</button>
								
								<p className='dark-fg2color'>or Sign in with</p>
								<span className='dark-fg2color'><button className='btn-signin-with btn-img-google'>Google</button><button className='btn-signin-with btn-img-fb'>Facebook</button></span>
							</form>
						</div>

	  				</div>

					<br />
	  				<div className="row fit-width dark-fg2color">
	  					<span>{'Don\'t have an account? '}&nbsp;<Link href='/user/sign-up'><a className='dark-fg2color'>Sign up</a></Link></span>
	  				</div>
	  				
				</div>

				
				
			</main>
	  	</div>
  	)
}
