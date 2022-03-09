import '../styles/globals.css'
import {AuthUserProvider} from '../context/AuthUserContext'
import {SettingsProvider} from '../context/SettingsContext'
import '../firebase.config'

function MyApp({ Component, pageProps }) {
 	return <AuthUserProvider><SettingsProvider><Component {...pageProps} /></SettingsProvider></AuthUserProvider>
}

export default MyApp
