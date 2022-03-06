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
import {useTheme} from '../../context/ThemeContext'

export default function ForgotPassword() {
	const {theme, setTheme} = useTheme()
	const {authUser, loading, resetPassword} = useAuth()
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

	const onSubmit = (e) => {
		e.preventDefault()
		resetPassword(email, theme)
	}

  	return (
	  	!loading &&  !authUser ? (<div>
	  		<div className={theme+'-bg'}></div>
	  		<Head>
	        	<title>Reset Password | SOrganizer</title>
	      	</Head>
	  		<ToastContainer/>

	  		<main className='fill-screen horizontal-center flex'>

	  			<div className='container flex vertical-center'>
	  				<br />
	  				<h1 className={theme+'-fgcolor'}>SOrganizer</h1>
	  				<br />
	  				<div className={'fit-width card '+theme+'-bg3color'}>

	  					<div className='row vertical-center'>
		  					<h1 className={theme+'-fgcolor form-label'}>Reset Password</h1>
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
