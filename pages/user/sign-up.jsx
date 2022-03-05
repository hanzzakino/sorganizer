
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../../components/navbar'
import Spinner from '../../components/spinner'
import OauthButton from '../../components/oauthButton'

//initialize firebase app (and import db) using the cofig file
import {db} from '../../firebase.config'
import { setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'

//Context
import {useAuth} from '../../context/AuthUserContext'
import {useTheme} from '../../context/ThemeContext'


export default function SignUp() {
	const {theme, setTheme} = useTheme()
	const {authUser, loading, oauthloading} = useAuth()
	const router = useRouter()
	const [showPassword , setshowPassword] = useState(false)
	const [formData, setFormData] = useState({
		firstname : '',
		lastname : '',
		email : '',
		password : '',
		confirmpassword : ''
	})
	const {firstname, lastname, email, password, confirmpassword} = formData
	
	useEffect(() => {
		if(!oauthloading && !loading &&  authUser){
			router.push('/user')
		}
	}, [authUser, loading])
	
	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id] : e.target.value
			
		}))
	}

	//Register user to google firebase authentication
	const onSubmit = async (e) => {
		e.preventDefault()
		if(password === confirmpassword){
			try {
				const auth = getAuth()
				const userCredential = await createUserWithEmailAndPassword(auth, email, password)
				const user = userCredential.user
				updateProfile(auth.currentUser, {
					displayName : firstname+' '+lastname
				})
				
				//form data copy
				const storageFormData = {...formData}
				delete storageFormData.password
				delete storageFormData.confirmpassword
				storageFormData.timestamp = serverTimestamp()
				//added modified formdata to firestore db
				await setDoc(doc(db,'users',user.uid), storageFormData)
				router.push('/user')
			} catch(e) {
				toast('An error occured', {
						position : 'top-right',
						autoClose : 5000,
						theme : theme,
						type : 'error',
						hideProgressBar : true
				})
			}
		} else {
			toast('Confirm Password didn\'t match', {
					position : 'top-right',
					autoClose : 5000,
					theme : theme,
					type : 'error',
					hideProgressBar : true
			})
		}
	}

  	return (
	  	!loading &&  !authUser ? (<div>
	  		<div className={theme+'-bg'}></div>
	  		<Head>
	        	<title>Sign up | SOrganizer</title>
	      	</Head>
	  		<ToastContainer />
	  		<br />

	  		<div className="container">

	  			<div className="row fill-screen flex horizontal-center">

	  				<div className='column flex vertical-center'>
	  					<div className={'flex vertical-center fit-width  card '+theme+'-bg3color'}>
		  					<h1 className={theme+'-fgcolor form-label'}>Create an Account</h1>
		  					<br />
		  					<form onSubmit={onSubmit}>
								<div className='input-field-name'>
									<input 
									 type='text' 
									 placeholder='First Name'
									 id='firstname' 
									 value={firstname}
									 onChange={onChange}
									 autoComplete='first-name' 
									 />
									 <input 
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
								<div className='input-field'>
									<i className='bi bi-lock-fill field-icon'></i>
									<input 
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
									<button className={'btn '+theme+'-accentbgcolor'}>Sign up</button>
								</div>
							</form>
							<p className={theme+'-fg2color'}>or Sign up with</p>
							<OauthButton />
							<br />
						</div>
				
	  					<div className={'fit-width '+theme+'-fg2color'}>
	  						<br />
	  						<span>{'Already have an account? '}&nbsp;<Link href='/user/sign-in'><a className={theme+'-fg2color'}>Sign in</a></Link></span>
	  					</div>
	  				</div>

	  			</div>

	  		</div>	



	  	</div>):(<Spinner theme={theme}/>)
  	)
}
