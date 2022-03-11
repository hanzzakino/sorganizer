//Context
import {useSettings} from '../context/SettingsContext'
import {useAuth} from '../context/AuthUserContext'

export default function OauthButton() {
  	const {settings} = useSettings()
  	const {googleOauth, facebookOauth} = useAuth()

  	const googleAuthClick = (e) => {
  		e.preventDefault()
  		googleOauth(settings)
  	}

  	const facebookAuthClick = (e) => {
  		e.preventDefault()
  		facebookOauth(settings)
  	}

  	return (
    	<span className={settings.general.theme+'-fg2color'}><button className='btn-with-logo btn-img-google' onClick={googleAuthClick}>Google</button><button className='btn-with-logo btn-img-fb' onClick={facebookAuthClick}>Facebook</button></span>
  	)
}
