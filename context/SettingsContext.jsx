import { createContext, useState, useContext } from 'react'

const SettingsContext = createContext()

export const SettingsProvider = ({children}) =>{
	//default settings
	const [settings, setSettings] = useState({
		general : {
			theme : 'dark'
		}
	})

	const toggleTheme = () => {
		setSettings((prevSettings) => {
			return prevSettings.general.theme ==='dark' ? {
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
		})
	}

	return <SettingsContext.Provider value={({
		settings,
		toggleTheme,
	})}>{children}</SettingsContext.Provider>
}

export const useSettings = () => useContext(SettingsContext)