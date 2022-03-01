

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../../components/navbar'

//initialize firebase app using the firebase.config file
import '../../firebase.config'
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'

//useAuthContext
import {useAuth} from '../../context/AuthUserContext'

export default function ForgotPassword() {
	const {authUser, loading} = useAuth()
	const router = useRouter()
	const [showPassword , setshowPassword] = useState(false)
	const [formData, setFormData] = useState({
		email : '',
	})
	const {email} = formData

	useEffect(() => {
		if(!loading &&  authUser){
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
				message = 'User not found'
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
				message = 'Too many attempts. Please try again later'
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
			await sendPasswordResetEmail(auth, email)
			toast.success('Email was Sent')
		} catch(e) {
			const {message,attributes} = parseErrorMessage(e.message)
			toast(message,attributes)
		}
		
	}

  	return (
	  	!loading &&  !authUser ? (<div>
	  		<Head>
	        	<title>Sign in - SOrganizer</title>
	      	</Head>
	  		<ToastContainer/>

	  		<main className='fill-screen vertical-center flex'>

	  			<div className="container flex horizontal-center">

	  				<div className='fit-width card dark-bg3color'>

	  					<div className="row horizontal-center">
		  					<h1 className="dark-fgcolor form-signin-label">Forgot Password</h1>
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
								<button className='btn-signin dark-accentbgcolor'>Send Reset Link</button>
								</form>
						</div>

	  				</div>

					<br />
	  				<div className="row fit-width dark-fg2color">
	  					<span>{'Go back to'}&nbsp;<Link href='/user/sign-in'><a className='dark-fg2color'>Sign in</a></Link></span>
	  				</div>
	  				
				</div>

				
				
			</main>
	  	</div>):(<div className='container dark-fgcolor' align='center'>
					<Head>
				    	<title>SOrganizer</title>
				  	</Head>
				  	<p>Loading</p>
				</div>)
  	)
}
