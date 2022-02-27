
import { useState } from 'react'
import Navbar from '../../components/navbar'
import Link from 'next/link'

export default function Login() {
	
	const [showPassword , setshowPassword] = useState(false)
	const [formData, setFormData] = useState({
		email : '',
		password : ''
	})

	const {email, password} = formData

	const onChange = (e) => {
		setFormData((prevState) => {
			prevState[e.target.id] = e.target.value
			return prevState
		})
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(formData)
	}

  	return (
	  	<div>
	  		<main className='fill-screen vertical-center flex'>

	  			<div className="container flex horizontal-center">

	  				<div className='fit-width card dark-bg3color'>

	  					<div className="row horizontal-center">
		  					<p className="dark-fgcolor form-signin-label">Login</p>
		  					<br />
		  				</div>

						<div className="row">
							<form className='form-signin'>
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
								
								
								
								<span><Link href='/user/forgot-password'><a className='dark-fg2color'>Forgot your Password?</a></Link></span>
								<br />
								<button className='btn-login dark-accentbgcolor' onClick={handleSubmit}>Sign in</button>
								
								<p className='dark-fg2color'>or Sign in with</p>
								<span className='dark-fg2color'><button className='btn-login-with btn-img-google'>Google</button><button className='btn-login-with btn-img-fb'>Facebook</button></span>
							</form>
						</div>

	  				</div>

					<br />
	  				<div className="row fit-width dark-fg2color">
	  					{'Don\'t have an account? '}&nbsp;<Link href='/user/sign-up'><a className='dark-fg2color'>Sign up</a></Link>
	  				</div>
	  				
				</div>

				
				
			</main>
	  	</div>
  	)
}
