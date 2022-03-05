
//Context
import {useAuth} from '../context/AuthUserContext'
import {useTheme} from '../context/ThemeContext'


export default function OauthButton() {
  const {theme, setTheme} = useTheme()

  const googleOauth = () => {
    console.log('Google')
  }

  return (
    <span className={theme+'-fg2color'}><button className='btn-with-logo btn-img-google' onClick={googleOauth}>Google</button><button className='btn-with-logo btn-img-fb'>Facebook</button></span>
  )
}
