import { createContext, useState, useContext } from 'react'

const SettingsContext = createContext()

export const SettingsProvider = ({children}) =>{
	const [theme, setTheme] = useState('dark')
	//default settings
	const [settings, setSettings] = useState({
		general : {
			tempsettings : true,
			theme : 'light'
		},
		temp : {
			tempsettings : true,
		}

	})

	const toggleTheme = () => {
		setTheme((prevState) => {
			return prevState ==='dark' ? 'light':'dark'
		})
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
		theme,
		toggleTheme,
	})}>{children}</SettingsContext.Provider>
}

export const useSettings = () => useContext(SettingsContext)