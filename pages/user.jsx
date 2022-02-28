
import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
//initialize firebase app using the firebase.config file
import '../firebase.config'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {useAuth} from '../context/AuthUserContext'


export default function User() {
	const {authUser, loading, signOut} = useAuth()
	const router = useRouter()
	
	useEffect(() => {
		if(!loading &&  !authUser){
			router.push('/user/login')
		}
	}, [authUser, loading])

	return (
		<div className='dark-fgcolor'>
			<br />
			{
				authUser ? 
				(<div>
					<p>{authUser.displayName}</p>
					<button onClick={signOut}>Logout</button>
				</div>):(<div></div>)
			}
		</div>
		)
}

// export async function getStaticProps(context){
// 	try {
// 		const auth = getAuth()
// 		let loggedIn = false
// 		onAuthStateChanged(auth, user => {
// 			console.log(auth)
// 			if(user){
// 				loggedIn = true
// 				console.log('loggedIn')
// 			}
// 			else{
// 				loggedIn  = false
// 				console.log('not loggedIn')
// 			}
// 		})

// 		loggedIn = true
// 		if(loggedIn){
// 			return { props: { loggedIn } }
// 		} else {
// 			console.log('redirected to login2')
// 			return {
// 				redirect: {
// 					destination: '/user/login',
// 					permanent: false
// 				}
// 			}
// 		}

// 	} catch(e) {
// 		console.log(e);
// 		console.log('redirected to login2')
	
// 		return {
// 			redirect: {
// 				destination: '/user/login',
// 				permanent: false
// 			}
// 		}
// 	}
// }