
//Global context for the current panel showed the the dashboard
// panels are subjects, tasks, schedule, and notes


import { createContext, useState, useContext } from 'react'

const DashboardContext = createContext()

export const DashboardProvider = ({children}) =>{

	// hooks

	const [currentView, setCurrentView] = useState('subjects')
	const [currentTitle, setCurrentTitle] = useState('Subjects')


	/////CONTEXT FUNCTIONS

	const setDashboardView = (view) => {
		setCurrentView(view)
	}
	const setDashboardTitle = (title) => {
		setCurrentTitle(title)
	}

	//pass the methods and hooks in the value
	return <DashboardContext.Provider value={({
		currentView,
		setDashboardView,
		currentTitle,
		setDashboardTitle
	})}>{children}</DashboardContext.Provider>
}

export const useDashboardContext = () => useContext(DashboardContext)