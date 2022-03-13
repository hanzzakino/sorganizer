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
	const [subjects, setSubjects] = useState([])


	const getSubjects = async () => {
		try {
			const auth = getAuth()
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
		} catch(e) {
			console.log('getSubjects',e)
			toast('An error occured while getting Database data', {
					position : 'top-right',
					autoClose : 5000,
					theme : 'light',
					type : 'error',
					hideProgressBar : true
			})
		} finally {
			setGetDataDone(true)
		}
	}

	

	return <FirestoreDataContext.Provider value={({
		getDataDone,
		getSubjects,
		subjects
	})}>{children}</FirestoreDataContext.Provider>
}

export const useFirestoreData = () => useContext(FirestoreDataContext)