import { createContext, useState, useContext } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({children}) =>{
	const [theme, setTheme] = useState('dark')

	const toggleTheme = () => {
		setTheme((prevState) => {
			return prevState==='dark' ? 'light':'dark'
		})
	}

	return <ThemeContext.Provider value={({
		theme,
		toggleTheme,
	})}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)