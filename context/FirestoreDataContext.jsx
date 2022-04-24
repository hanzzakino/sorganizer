import { createContext, useState, useContext } from 'react'
import {getAuth} from 'firebase/auth'
import {db} from '../firebase.config'
import {
	setDoc,
	getDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
	query,
	getDocs,
	collection,
	serverTimestamp,
	orderBy,
	where
} from 'firebase/firestore'




const FirestoreDataContext = createContext()

export const FirestoreDataProvider = ({children}) =>{
	//states
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
	const [selectedSubject, setSelectedSub] = useState(null)

	//user data methods
	const getUserData = async () => {
		console.log('getting user data')
		try {
			const auth = getAuth()
			if(auth.currentUser){
				const docRef = doc(db,'users',auth.currentUser.uid)
				console.log('FirestoreCommunicate getUserData get')
				const docSnap = await getDoc(docRef)
				if(docSnap.exists()){
					setUserData(docSnap.data())
				}
			}
		} catch(e) {
			console.log('getUserData error',e)
		} finally {
			console.log('getUserData success', userData)
			setGetUserDataDone(true)
		}
	}
	const setUsername = async (firstname, lastname) => {
		console.log('setting user name')
		try {
			const auth = getAuth()
			const docRef = doc(db, 'users', auth.currentUser.uid)
			console.log('FirestoreCommunicate setUsername update')
	    	await updateDoc(docRef, {
	    		firstname,
	    		lastname
			})
			setUserData((prevState) => ({
				...prevState,
				firstname,
	    		lastname
			}))
		} catch(e) {
			console.log('setUsername error',e)
		} finally {
			console.log('setUsername success', userData)
		}
	}

	//user subjects methods
	const addSubject = async (subject) => {
		console.log('adding new subject',subject)
		try {
			const auth = getAuth()
			const docRef = collection(db, 'users', auth.currentUser.uid,'subjects')
			console.log('FirestoreCommunicate addSubject add')
			await addDoc(docRef, subject)
		} catch(e) {
			console.log('addSubject error',e)
		} finally {
			console.log('addSubject success')
			getSubjects()
		}
	}
	const addTask = async (subjectID, task) => {
		console.log('adding new task',subjectID,task)
		try {
			const auth = getAuth()
			const docRef = collection(db, 'users', auth.currentUser.uid,'subjects',subjectID,'tasks')
			console.log('FirestoreCommunicate addTask add')
			await addDoc(docRef, task)
		} catch(e) {
			console.log('addTask error',e)
		} finally {
			console.log('addTask success')
			getSubjects()
		}
	}
	const setToTaskDone = async (subjectID, taskID) => {
		console.log('setting task done')
		try {
			const auth = getAuth()
			const docRef = doc(db, 'users', auth.currentUser.uid,'subjects',subjectID,'tasks',taskID)
	    	console.log('FirestoreCommunicate setToTaskDone delete')
	    	await deleteDoc(docRef)
		} catch(e) {
			console.log('setToTaskDone error',e)
		} finally {
			console.log('setToTaskDone success')
			getSubjects()
		}
	}

	const deleteSubject = async (subjectID) => {
		console.log('deleting subject')
		try {
			const auth = getAuth()
			const docRef = doc(db, 'users', auth.currentUser.uid,'subjects',subjectID)
	    	console.log('FirestoreCommunicate deleteSubject delete')
	    	await deleteDoc(docRef)
		} catch(e) {
			console.log('deleteSubject error',e)
		} finally {
			console.log('deleteSubject success')
			getSubjects()
		}
	}

	const getSubjects = async () => {
		console.log('getting Subjects')
		try {
			const auth = getAuth()
			if(auth.currentUser){
				const q = query(collection(db,'users',auth.currentUser.uid,'subjects'))
				console.log('FirestoreCommunicate getSubjects get')
				const querySnapshot = await getDocs(q)
				let subjectsList = []
				querySnapshot.forEach((doc) => {
					subjectsList.push({
						id : doc.id,
						data : doc.data()
					})
				})
				

				for (let i = 0; i<subjectsList.length; i++) {
					let subjectTasksList = []
					try {
						const q2 = query(collection(db,'users',auth.currentUser.uid,'subjects',subjectsList[i].id,'tasks'),where('isDone','==',false),orderBy('deadline','asc'))
						console.log('FirestoreCommunicate getSubjects-task get')
						const querySnapshot2 = await getDocs(q2)
						
						querySnapshot2.forEach((task) => {
							subjectTasksList.push({
								id : task.id,
								data : task.data()
							})
						})
					} catch(e) {
						console.log('getSubjects tasks error',e)
					}
					
					subjectsList[i] = {
						...subjectsList[i],
						tasks : subjectTasksList
					}
				}
				setSubjects(subjectsList)
				

			}
		} catch(e) {
			console.log('getSubjects error',e)
		} finally {
			console.log('getSubjects success')
			updateSelectedSubject()
		}
	}


	const setSelectedSubject = (subject) => {
		console.log('setSelectedSubject', subject)
		setSelectedSub(subject)
	}

	const updateSelectedSubject = async () => {
		if(selectedSubject){
			try {
				const auth = getAuth()
				const docRef = doc(db,'users',auth.currentUser.uid,'subjects',selectedSubject.id)
				console.log('FirestoreCommunicate updateSelectedSubject get')
				const docSnap = await getDoc(docRef)
				if(docSnap.exists()){
					const q = query(collection(db,'users',auth.currentUser.uid,'subjects',selectedSubject.id,'tasks'))
					console.log('FirestoreCommunicate updateSelectedSubject-task get')
					const querySnapshot = await getDocs(q)
					const taskslist = []
					querySnapshot.forEach((doc) => {
						taskslist.push({
							id : doc.id,
							data : doc.data()
						})
					})
					setSelectedSubject({
						id : docSnap.id,
						data : docSnap.data(),
						tasks : taskslist
					})
				}
			} catch(e) {
				// statements
				console.log('updateSelectedSubject error',e);
			} finally {
				setGetDataDone(true)
				console.log('updateSelectedSubject success', selectedSubject)
			}
		} else {
			console.log('updateSelectedSubject success')
			setGetDataDone(true)
		}
	}





	//clear data
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
		setUsername,
		addSubject,
		deleteSubject,
		selectedSubject,
		setSelectedSubject,
		updateSelectedSubject,
		addTask,
		setToTaskDone,
		userData,
		clearData,
		subjects
	})}>{children}</FirestoreDataContext.Provider>
}

export const useFirestoreData = () => useContext(FirestoreDataContext)