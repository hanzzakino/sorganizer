import { createContext, useState, useContext } from 'react'
import { toast } from 'react-toastify'
import {getAuth} from 'firebase/auth'
import {db} from '../firebase.config'
import {
	setDoc,
	getDoc,
	doc,
	query,
	getDocs,
	collection,
	serverTimestamp
} from 'firebase/firestore'




const FirestoreDataContext = createContext()

export const FirestoreDataProvider = ({children}) =>{
	//default settings
	const [getDataDone, setGetDataDone] = useState(false)
	const [getUserDataDone, setGetUserDataDone] = useState(false)
	const [userData, setUserData] = useState({
		firstname : '',
		lastname : '',
		email : '',
		settings : null,
		timestamp : null,
	})
	const [subjects, setSubjects] = useState([])


	const getUserData = async () => {
		console.log('getting user data')
		try {
			const auth = getAuth()
			if(auth.currentUser){
				const docRef = doc(db,'users',auth.currentUser.uid)
				const docSnap = await getDoc(docRef)
				if(docSnap.exists()){
					setUserData(docSnap.data())
				}
			}
		} catch(e) {
			console.log('getUserData',e)
			toast('An error occured while getting Database data', {
					position : 'top-right',
					autoClose : 5000,
					theme : 'light',
					type : 'error',
					hideProgressBar : true
			})
		} finally {
			console.log('userData', userData)
			setGetUserDataDone(true)
		}
	}

	const getSubjects = async () => {
		console.log('getting Subjects')
		try {
			const auth = getAuth()
			if(auth.currentUser){
				const q = query(collection(db,'users',auth.currentUser.uid,'subjects'))
				const querySnapshot = await getDocs(q)
				let subjectsList = []
				querySnapshot.forEach((doc) => {
					subjectsList.push({
						id : doc.id,
						data : doc.data()
					})
				})
				setSubjects(subjectsList)
			}
		} catch(e) {
			console.log('getSubjects',e)
		} finally {
			setGetDataDone(true)
		}
	}


	const clearData = async () => {
		setGetDataDone(false)
		setGetUserDataDone(false)
		setUserData(null)
		setSubjects([])
	}
	

	return <FirestoreDataContext.Provider value={({
		getDataDone,
		getSubjects,
		getUserDataDone,
		getUserData,
		userData,
		clearData,
		subjects
	})}>{children}</FirestoreDataContext.Provider>
}

export const useFirestoreData = () => useContext(FirestoreDataContext)