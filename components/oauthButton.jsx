import { useRouter } from 'next/router'
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {db} from '../firebase.config'
import { setDoc, doc, getDoc, serverTimestamp, runTransaction } from 'firebase/firestore'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//Context
import {useTheme} from '../context/ThemeContext'
import {useAuth} from '../context/AuthUserContext'

export default function OauthButton() {
  	const {theme, setTheme} = useTheme()
  	const router = useRouter()
  	const {oauthloadingtrue, oauthloadingfalse} = useAuth()
  	
  	const googleOauth = async () => {

	    try {
	    	oauthloadingtrue()
	    	const auth = getAuth()
	    	const provider = new GoogleAuthProvider()
	    	const result = await signInWithPopup(auth, provider)
	    	const user = result.user

	    	const docRef = doc(db, 'users', user.uid)
	    	const docSnap = await getDoc(docRef)

	    	if(!docSnap.exists()){
	    		
	    		await setDoc(doc(db,'users',user.uid), {
		    		firstname : String(user.displayName.split(' ').slice(0,-1).join()),
					lastname : String((user.displayName.split(' ').slice(-1))[0]),
					email : user.email,
					timestamp : serverTimestamp()
				})
				router.push('/user')
	    	} else {
	    		router.push('/user')
	    	}

	    } catch(e) {
	    	console.log(e)
	    	toast('Could not sign in with Google', {
				position : 'top-right',
				autoClose : 5000,
				theme : theme,
				type : 'error',
				hideProgressBar : true
			})
	    } finally {
	    	oauthloadingfalse()
	    }
	  }

  	return (
    	<span className={theme+'-fg2color'}><button className='btn-with-logo btn-img-google' onClick={googleOauth}>Google</button><button className='btn-with-logo btn-img-fb'>Facebook</button></span>
  	)
}
