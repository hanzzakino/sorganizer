//Global context for the settings

import { createContext, useState, useContext } from 'react'
import { toast } from 'react-toastify'
import {
	getAuth
} from 'firebase/auth'

import {db} from '../firebase.config'
import {
	setDoc,
	getDoc,
	doc
} from 'firebase/firestore'


const SettingsContext = createContext()

export const SettingsProvider = ({children}) =>{
	//default settings
	//Settings template
	const [settings, setSettings] = useState({
		general : {
			tempSettingsF : false,
			theme : 'dark'
		},
		custom : {
			tempSettingsT : true,
			tempNumber : 27
		}
	})

	//retrieves the settings of the current user signed in
	const setLocalSettings = async () => {
		console.log('syncing local settings from firestore')
		try {
			
			const auth = getAuth()
			if(auth.currentUser){
				const docRef = doc(db,'users',auth.currentUser.uid)
				console.log('FirestoreCommunicate setLocalSettings get')
				const docSnap = await getDoc(docRef)
				if(docSnap.exists()){
					//add the settings from the user's firestore db to the settings state
					setSettings(docSnap.data().settings)
				}
			}
			console.log('setLocalSettings success')
		} catch(e) {
			console.log('get',e)
			toast('An error occured while getting Database data', {
					position : 'top-right',
					autoClose : 5000,
					theme : settings.general.theme,
					type : 'error',
					hideProgressBar : true
			})
		}
	}

	//updates the new user settings in the firestore
	const setUserSettings = async (newSettings) => {
		console.log('syncing firestore settings from local')
		try {
				
				const auth = getAuth()
				if(auth.currentUser){
					const docRef = doc(db,'users',auth.currentUser.uid)
					console.log('FirestoreCommunicate setUserSettings get')
					const docSnap = await getDoc(docRef)
					const newData = docSnap.data()
					newData.settings = newSettings
					await setDoc(docRef, newData)
				}
				console.log('setUserSettings success')
			} catch(e) {
				console.log('set',e)
				toast('An error occured while setting Database data', {
						position : 'top-right',
						autoClose : 5000,
						theme : settings.general.theme,
						type : 'error',
						hideProgressBar : true
				})
			}
	}


	//toggle theme between dark and light
	const toggleTheme = () => {
		setSettings((prevSettings) => {

			const newSettings = prevSettings.general.theme ==='dark' ? {
				...prevSettings,
				general : {
					...prevSettings.general,
					theme : 'light'
				}
			}:{
				...prevSettings,
				general : {
					...prevSettings.general,
					theme : 'dark'
				}
			}

			setUserSettings(newSettings)

			return newSettings
		})
	}

	return <SettingsContext.Provider value={({
		settings,
		toggleTheme,
		setLocalSettings
	})}>{children}</SettingsContext.Provider>
}

export const useSettings = () => useContext(SettingsContext)