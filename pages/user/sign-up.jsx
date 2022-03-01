
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../../components/navbar'

//initialize firebase app (and import db) using the cofig file
import {db} from '../../firebase.config'
import { setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'

export default function SignUp() {
	
	const [showPassword , setshowPassword] = useState(false)
	const [formData, setFormData] = useState({
		firstname : '',
		lastname : '',
		email : '',
		password : '',
		confirmpassword : ''
	})

	const {firstname, lastname, email, password, confirmpassword} = formData

	const nextrouter = useRouter()

	
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
				nextrouter.push('/user')
			} catch(e) {
				console.log(e.code+'\n'+e.message);
			}
		} else {
			toast('Confirm Password didn\'t match', {
					position : 'top-right',
					autoClose : 5000,
					theme : 'dark',
					type : 'error',
					hideProgressBar : true
			})
		}
	}

  	return (
	  	<div>
	  		<ToastContainer />
	  		<br />
	  		<main className='vertical-center flex'>

	  			<div className='container flex horizontal-center'>

	  				<div className='fit-width card dark-bg3color'>

	  					<div className='row horizontal-center'>
		  					<p className='dark-fgcolor form-signin-label'>Create an Account</p>
		  					<br />
		  				</div>

						<div className='row'>
							<form className='form-signin' onSubmit={onSubmit}>
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
								
								
								
								<span><Link href='/user/forgot-password'><a className='dark-fg2color'>Forgot your Password?</a></Link></span>
								<br />
								<button className='btn-signin dark-accentbgcolor'>Sign up</button>
								
								<p className='dark-fg2color'>or Create an Account with</p>
								<span className='dark-fg2color'><button className='btn-signin-with btn-img-google'>Google</button><button className='btn-signin-with btn-img-fb'>Facebook</button></span>
								<br />
							</form>
						</div>

	  				</div>
	  				<br />
	  				<div className="row fit-width dark-fg2color">
	  					<span>{'Already have an account? '}&nbsp;<Link href='/user/sign-in'><a className='dark-fg2color'>Sign in</a></Link></span>
	  				</div>
				</div>
			</main>
			<br />
	  	</div>
  	)
}
