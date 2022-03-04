
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../../components/navbar'
import Spinner from '../../components/spinner'

//initialize firebase app (and import db) using the cofig file
import {db} from '../../firebase.config'
import { setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'

//Context
import {useAuth} from '../../context/AuthUserContext'
import {useTheme} from '../../context/ThemeContext'


export default function SignUp() {
	const {theme, setTheme} = useTheme()
	const {authUser, loading} = useAuth()
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
	  		<main className='horizontal-center flex'>

	  			<div className='container flex vertical-center'>

	  				<div className={'fit-width card '+theme+'-bg3color'}>

	  					<div className='row vertical-center'>
		  					<p className={theme+'-fgcolor form-label'}>Create an Account</p>
		  					<br />
		  				</div>

						<div className='row'>
							<form className='form vetical-center flex' onSubmit={onSubmit}>
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
								
								<button className={'btn '+theme+'-accentbgcolor'}>Sign up</button>
							</form>
						</div>

						<div className="row">
							<div className="column vertical-center flex">
								<p className={theme+'-fg2color'}>or Create an Account with</p>
								<span className={theme+'-fg2color'}><button className='btn-with-logo btn-img-google'>Google</button><button className='btn-with-logo btn-img-fb'>Facebook</button></span>
								
							</div>
						</div>

						<br />
	  				</div>
	  				<br />
	  				<div className={'row fit-width '+theme+'-fg2color'}>
	  					<span>{'Already have an account? '}&nbsp;<Link href='/user/sign-in'><a className={theme+'-fg2color'}>Sign in</a></Link></span>
	  				</div>
				</div>
			</main>
			<br />
	  	</div>):(<Spinner theme={theme}/>)
  	)
}
