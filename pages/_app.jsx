import '../styles/globals.css'
import {AuthUserProvider} from '../context/AuthUserContext'
import {SettingsProvider} from '../context/SettingsContext'
import {FirestoreDataProvider} from '../context/FirestoreDataContext'
import '../firebase.config'

function MyApp({ Component, pageProps }) {
 	return <AuthUserProvider><FirestoreDataProvider><SettingsProvider><Component {...pageProps} /></SettingsProvider></FirestoreDataProvider></AuthUserProvider>
}

export default MyApp
