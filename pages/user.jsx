
import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
//initialize firebase app using the firebase.config file
import '../firebase.config'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

export default function User() {
	const nextrouter = useRouter()
	const auth = getAuth()
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email
	})

	const {name,email} = formData
	
	const onLogout = () => {
		auth.signOut()
		nextrouter.push('/user/login')
	}


	
	return (
		<div className='dark-fgcolor'>
			{JSON.stringify(formData)}
			<button onClick={onLogout}>Logout</button>
		</div>
		)


}
