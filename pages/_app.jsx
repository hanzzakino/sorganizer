import '../styles/globals.css'
import {AuthUserProvider} from '../context/AuthUserContext'
import {ThemeProvider} from '../context/ThemeContext'
import '../firebase.config'

function MyApp({ Component, pageProps }) {
 	return <AuthUserProvider><ThemeProvider><Component {...pageProps} /></ThemeProvider></AuthUserProvider>
}

export default MyApp
