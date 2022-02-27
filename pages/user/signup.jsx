
import { useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/navbar'
import Link from 'next/link'

import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {db} from '../../firebase.config'

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
		setFormData((prevState) => {
			prevState[e.target.id] = e.target.value
			return prevState
		})
	}

	//Register user to google firebase authentication
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const auth = getAuth()
			const userCredential = await createUserWithEmailAndPassword(auth, email, password)
			const user = userCredential.user
			updateProfile(auth.currentUser, {
				displayName : firstname+' '+lastname
			})
			nextrouter.push('/user')
		} catch(e) {
			console.log(e);
		}
	}

  	return (
	  	<div>
	  		<br />
	  		<main className='vertical-center flex'>

	  			<div className="container flex horizontal-center">

	  				<div className='fit-width card dark-bg3color'>

	  					<div className="row horizontal-center">
		  					<p className="dark-fgcolor form-signin-label">Create an Account</p>
		  					<br />
		  				</div>

						<div className="row">
							<form className='form-signin' onSubmit={handleSubmit}>
								<div className="input-field-name">
									<input 
									 type="text" 
									 placeholder='First Name'
									 id='firstname' 
									 onChange={onChange}
									 autoComplete='first-name' 
									 />
									 <input 
									 type="text" 
									 placeholder='Last Name'
									 id='lastname' 
									 onChange={onChange}
									 autoComplete='last-name' 
									 />
								</div>
								<div className="input-field">
									<i className="bi bi-person-fill field-icon" />
									<input 
									 type="email" 
									 placeholder='Email'
									 id='email' 
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
									onChange={onChange}
									autoComplete='current-password'/>
									<i 
									className={showPassword ? 'bi bi-eye field-toggle':'bi bi-eye-slash field-toggle'} 
									onClick={() => setshowPassword((prevState) => !prevState)}/>
								</div>
								<div className="input-field">
									<i className="bi bi-lock-fill field-icon"></i>
									<input 
									type={showPassword ? 'text':'password'} 
									placeholder='Confirm Password' 
									id='confirmpassword' 
									onChange={onChange}
									autoComplete='confirm-password'/>
									<i 
									className={showPassword ? 'bi bi-eye field-toggle':'bi bi-eye-slash field-toggle'} 
									onClick={() => setshowPassword((prevState) => !prevState)}/>
								</div>
								
								
								
								<span><Link href='/user/forgot-password'><a className='dark-fg2color'>Forgot your Password?</a></Link></span>
								<br />
								<button className='btn-login dark-accentbgcolor'>Sign up</button>
								
								<p className='dark-fg2color'>or Create an Account with</p>
								<span className='dark-fg2color'><button className='btn-login-with btn-img-google'>Google</button><button className='btn-login-with btn-img-fb'>Facebook</button></span>
								<br />
							</form>
						</div>

	  				</div>
				</div>
			</main>
			<br />
	  	</div>
  	)
}
