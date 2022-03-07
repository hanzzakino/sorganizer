import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

//components
import Navbar from '../../components/navbar'
import Spinner from '../../components/spinner'
import OauthButton from '../../components/oauthButton'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//Context
import {useAuth} from '../../context/AuthUserContext'
import {useTheme} from '../../context/ThemeContext'


export default function SignIn() {
	const {theme} = useTheme()
	const {authUser, loading, signInEmail, currentTask, dataWriteDone} = useAuth()
	const router = useRouter()
	const [showPassword , setshowPassword] = useState(false)
	const [formData, setFormData] = useState({
		email : '',
		password : ''
	})
	const {email, password} = formData
	
	useEffect(() => {
		if(!loading &&  authUser && dataWriteDone){
			router.push('/user')
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
		signInEmail(email, password, theme)
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

	  	</div>):(<Spinner theme={theme} currentTask={currentTask}/>)
  	)
}
