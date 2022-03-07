import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '../components/spinner'

//initialize firebase app using the firebase.config file
import {db} from '../firebase.config'
import {doc, getDoc, onSnapshot} from 'firebase/firestore'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

//Context
import {useAuth} from '../context/AuthUserContext'
import {useTheme} from '../context/ThemeContext'


export default function User() {
	const {theme, toggleTheme} = useTheme()
	const {authUser, loading, signOut, currentTask, dataWriteDone} = useAuth()
	const [gettingDB, setGettingDB] = useState(true)
	const router = useRouter()
	const [dbData, setDbData] = useState({
		firstname : '',
		lastname : '',
		email : '',
		timestamp : null
	})
	const {firstname, lastname, email} = dbData
	
	const getDocData = async () => {
		try {
			setGettingDB(true)
			const docRef = doc(db,'users',authUser.uid)
			const docSnap = await getDoc(docRef)
			if(docSnap.exists()){
				setDbData(docSnap.data())
				setGettingDB(false)
			}
			
		} catch(e) {
			toast('An error occured while getting Database data', {
					position : 'top-right',
					autoClose : 5000,
					theme : theme,
					type : 'error',
					hideProgressBar : true
			})
			setGettingDB(false)
		}
	}

	useEffect(() => {
		if(!loading &&  !authUser && dataWriteDone){
			router.push('/user/sign-in')
		} else if(authUser && !loading){
			getDocData()
		}
	}, [authUser, loading, dataWriteDone])

	return authUser && !loading ? (
		<>
		<div className={theme+'-bg'}></div>
		<div className={'container '+theme+'-fgcolor'} align='center'>

			<br />
							 
				<div>
					<Head>
				    	<title>Dashboard | SOrganizer</title>
				  	</Head>
					<div className='horizontal-center flex row temp-textcontainer horizontal-center'>
						{gettingDB ? <Spinner theme={theme} spinnerOnly/>:<h1>{firstname+' '+lastname}</h1>}
						<p>{JSON.stringify(authUser, null, 2)}</p>
						<h1>DB DATA</h1>
						<br />
						<p>{JSON.stringify(dbData, null, 2)}</p>
						<br />
					</div>
					<div className='horizontal-center flex row'><button className='btn' onClick={signOut}>Logout</button></div>

					<div className='horizontal-center flex row'><button className='btn' onClick={toggleTheme}>Switch to {theme==='dark' ? 'Light':'Dark'} Theme</button></div>
				<br /><br />
				</div>
			
		</div>
		</>
		):(<Spinner theme={theme} currentTask={currentTask}/>)
}