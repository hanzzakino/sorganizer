import { createContext, useState, useContext } from 'react'


const DashboardContext = createContext()

export const DashboardProvider = ({children}) =>{

	const [currentView, setCurrentView] = useState('subjects')

	const setDashboardView = (view) => {
		setCurrentView(view)
	}

	return <DashboardContext.Provider value={({
		currentView,
		setDashboardView
	})}>{children}</DashboardContext.Provider>
}

export const useDashboardContext = () => useContext(DashboardContext)