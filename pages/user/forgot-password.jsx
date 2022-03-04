import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../../components/navbar'
import Spinner from '../../components/spinner'

//initialize firebase app using the firebase.config file
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'

//Context
import {useAuth} from '../../context/AuthUserContext'
import {useTheme} from '../../context/ThemeContext'

export default function ForgotPassword() {
	const {theme, setTheme} = useTheme()
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
					theme : theme,
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
			await sendPasswordResetEmail(auth, email)
			toast.success('Email was Sent',{autoClose : false, theme : theme})
		} catch(e) {
			const {message,attributes} = parseErrorMessage(e.message)
			toast(message,attributes)
		}
		
	}

  	return (
	  	!loading &&  !authUser ? (<div>
	  		<div className={theme+'-bg'}></div>
	  		<Head>
	        	<title>Reset password | SOrganizer</title>
	      	</Head>
	  		<ToastContainer/>

	  		<main className='fill-screen horizontal-center flex'>

	  			<div className='container flex vertical-center'>

	  				<div className={'fit-width card '+theme+'-bg3color'}>

	  					<div className='row vertical-center'>
		  					<h1 className={theme+'-fgcolor form-label'}>Forgot Password</h1>
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
								<button className={'btn '+theme+'-accentbgcolor'}>Send Reset Link</button>
								</form>
						</div>

	  				</div>

					<br />
	  				<div className={'row fit-width '+theme+'-fg2color'}>
	  					<span>{'Go back to'}&nbsp;<Link href='/user/sign-in'><a className={theme+'-fg2color'}>Sign in</a></Link></span>
	  				</div>
	  				
				</div>

				
				
			</main>
	  	</div>):(<Spinner theme={theme}/>)
  	)
}
