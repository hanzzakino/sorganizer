import Navbar from '../../components/navbar'
import Link from 'next/link'

export default function Login() {
	const handleLogin = (e) => {
		e.preventDefault()
		console.log(e.target.password.value)
	}
  	return (
	  	<div>
	  		<main className='dark-bgcolor fill-screen vertical-center flex'>

	  			<div className="container flex horizontal-center">

	  				<div className='fit-width card dark-bg3color'>
	  					<div className="row horizontal-center">
		  					<p className="dark-fgcolor form-signin-label">Login</p>
		  					<br />
		  				</div>
						<div className="row">
							<form onSubmit={handleLogin} className='form-signin'>
								{/*<label htmlFor="username">Username Icon</label>*/}
								<input type="text" placeholder='Username' name='username'/>
								
								{/*<label htmlFor="password">Password Icon</label>*/}
								<input type="password" placeholder='Password' name='password'/>
								
								<span><Link href='/user/forgot-password'><a className='dark-fg2color'>Forgot your Password?</a></Link></span>
								<br />
								<button className='btn-login dark-accentbgcolor'>Sign in</button>
								
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
