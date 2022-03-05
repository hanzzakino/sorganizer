import { useRouter } from 'next/router'
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {db} from '../firebase.config'
import { setDoc, doc, getDoc, serverTimestamp} from 'firebase/firestore'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//Context
import {useAuth} from '../context/AuthUserContext'
import {useTheme} from '../context/ThemeContext'


export default function OauthButton() {
  const {theme, setTheme} = useTheme()
  const router = useRouter()
  const googleOauth = async () => {
    try {
    	const auth = getAuth()
    	const provider = new GoogleAuthProvider()
    	const result = await signInWithPopup(auth, provider)
    	const user = result.user

    	const docRef = doc(db, 'users', user.uid)
    	const docSnap = await getDoc(docRef)

    	if(!docSnap.exists()){
    		await setDoc(doc(db, 'users', user.uid), {
    			firstname : user.displayName.split(' ').pop().join(),
				lastname : user.displayName.split(' ')[1],
				email : user.email,
				timestamp : serverTimestamp()
    		})
    	}
    	router.push('/user')
    } catch(e) {
    	toast('Could not sign in with Google', {
						position : 'top-right',
						autoClose : 5000,
						theme : theme,
						type : 'error',
						hideProgressBar : true
		})
    }
  }

  return (
    <span className={theme+'-fg2color'}><button className='btn-with-logo btn-img-google' onClick={googleOauth}>Google</button><button className='btn-with-logo btn-img-fb'>Facebook</button></span>
  )
}
