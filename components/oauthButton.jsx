//Context
import {useTheme} from '../context/ThemeContext'
import {useAuth} from '../context/AuthUserContext'

export default function OauthButton() {
  	const {theme, setTheme} = useTheme()
  	const {googleOauth, facebookOauth} = useAuth()

  	const googleAuthClick = (e) => {
  		e.preventDefault()
  		googleOauth(theme)
  	}

  	const facebookAuthClick = (e) => {
  		e.preventDefault()
  		facebookOauth(theme)
  	}

  	return (
    	<span className={theme+'-fg2color'}><button className='btn-with-logo btn-img-google' onClick={googleAuthClick}>Google</button><button className='btn-with-logo btn-img-fb' onClick={facebookAuthClick}>Facebook</button></span>
  	)
}
