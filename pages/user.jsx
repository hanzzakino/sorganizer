
import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
//initialize firebase app using the firebase.config file
import {db} from '../firebase.config'
import {doc, getDoc} from 'firebase/firestore'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {useAuth} from '../context/AuthUserContext'


export default function User() {
	const {authUser, loading, signOut} = useAuth()
	const [dbData, setDbData] = useState({
		firstname : '',
		lastname : '',
		email : '',
		timestamp : null
	})
	const router = useRouter()
	
	const getDocData = async () => {
		try {
			const docRef = doc(db,'users',authUser.uid)
			const docSnap = await getDoc(docRef)
			if(docSnap.exists()){
				setDbData(docSnap.data())
			}
		} catch(e) {
			console.log(e)
		}
	}

	const {firstname, lastname, email} = dbData

	useEffect(() => {
		if(!loading &&  !authUser){
			router.push('/user/sign-in')
		} else if(authUser && !loading){
			getDocData()
		}
	}, [authUser, loading])

	

	return (
		<div className='container dark-fgcolor' align='center'>
			<br />
			{
				authUser && !loading ? 
				(<div>
					<div className='vertical-center flex row temp-textcontainer vertical-center'>
						<h1>{firstname+' '+lastname}</h1>
						<p>{JSON.stringify(authUser, null, 2)}</p>
						<h1>DB DATA</h1>
						<br />
						<p>{JSON.stringify(dbData, null, 2)}</p>
						<br />
					</div>
					<div className="vertical-center flex row"><button onClick={signOut}>Logout</button></div>
				<br /><br />
				</div>

				):(<div></div>)
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
// 			console.log('redirected to signin2')
// 			return {
// 				redirect: {
// 					destination: '/user/signin',
// 					permanent: false
// 				}
// 			}
// 		}

// 	} catch(e) {
// 		console.log(e);
// 		console.log('redirected to signin2')
	
// 		return {
// 			redirect: {
// 				destination: '/user/signin',
// 				permanent: false
// 			}
// 		}
// 	}
// }