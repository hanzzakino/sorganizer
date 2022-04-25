import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import {AuthUserProvider} from '../context/AuthUserContext'
import {SettingsProvider} from '../context/SettingsContext'
import {FirestoreDataProvider} from '../context/FirestoreDataContext'
import {DashboardProvider} from '../context/DashboardContext'
import '../firebase.config'

function MyApp({ Component, pageProps }) {
 	return <AuthUserProvider><FirestoreDataProvider><SettingsProvider><DashboardProvider><Component {...pageProps} /></DashboardProvider></SettingsProvider></FirestoreDataProvider></AuthUserProvider>
}

export default MyApp
