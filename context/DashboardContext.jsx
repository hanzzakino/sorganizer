import { createContext, useState, useContext } from 'react'


const DashboardContext = createContext()

export const DashboardProvider = ({children}) =>{

	const [currentView, setCurrentView] = useState('subjects')
	const [currentTitle, setCurrentTitle] = useState('Subjects')

	const setDashboardView = (view) => {
		setCurrentView(view)
	}

	return <DashboardContext.Provider value={({
		currentView,
		setDashboardView,
		currentTitle,
		setCurrentTitle
	})}>{children}</DashboardContext.Provider>
}

export const useDashboardContext = () => useContext(DashboardContext)