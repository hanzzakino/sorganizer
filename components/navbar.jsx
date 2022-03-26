import {useEffect} from 'react'
import {useFirestoreData} from '../context/FirestoreDataContext'
import {useDashboardContext} from '../context/DashboardContext'
import {useAuth} from '../context/AuthUserContext'
import {useSettings} from '../context/SettingsContext'
import { useRouter } from 'next/router'

export default function Navbar({theme, navbarCollapsed}) {
	const {signOut} = useAuth()
	const {settings, toggleTheme} = useSettings()
	const {currentView, setDashboardView, setDashboardTitle} = useDashboardContext()
	const {clearData} = useFirestoreData()
	const router = useRouter()

	const signOutClicked = () => {
		signOut()
		clearData()
	}

	// useEffect(() => {
		
	// },[currentView])


	const handleViewChange = (e) => {
		e.preventDefault()
		setDashboardView(e.target.name)
		switch(e.target.name){
			case 'subjects':
				setDashboardTitle('Subjects')
				break
			case 'todo':
				setDashboardTitle('To-do')
				break
			case 'schedule':
				setDashboardTitle('Schedule')
				break
			case 'notes':
				setDashboardTitle('Notes')
				break
			case 'settings':
				setDashboardTitle('Settings')
				break
			default:
				setDashboardTitle('Subjects')
				break
		}
		//setDashboardTitle('Subjects')
	}

	return (	
	<nav className={'dark-bg2color navbar '+(navbarCollapsed ? 'nv_collapsed ':'')}>

	<div onClick={() => router.push('/')} className={'dark-fgcolor navbar-logo-container'}>
		<div className={'navbar-logo '+(navbarCollapsed ? 'nvlg_collapsed':'')}></div>
		{navbarCollapsed ? <></>:<p className='navbar-logo-text'>SOrganizer</p>}
	</div>

	<div className={'navbar-menulist bottom-line flex '+(navbarCollapsed ? 'nvml_collapsed':'')}>
		<span>
			<i className={'bi bi-grid navbar-menulist-btn-icon '+'dark-fgcolor'} />
			<button className={'dark-fgcolor navbar-menulist-btn'+(navbarCollapsed ? ' nvmlbtn_minimized ':' ')+(currentView==='subjects' ? 'navbar-btn-selected':'')} 
			name='subjects'
			onClick={handleViewChange}>Subjects</button>
		</span>
		<span>
			<i className={'bi bi-card-checklist navbar-menulist-btn-icon '+'dark-fgcolor'} />
			<button className={'dark-fgcolor navbar-menulist-btn'+(navbarCollapsed ? ' nvmlbtn_minimized ':' ')+(currentView==='todo' ? 'navbar-btn-selected':'')} 
			name='todo'
			onClick={handleViewChange}>To&#8211;do</button>
		</span>
		<span>
			<i className={'bi bi-calendar-week navbar-menulist-btn-icon '+'dark-fgcolor'} />
			<button className={'dark-fgcolor navbar-menulist-btn'+(navbarCollapsed ? ' nvmlbtn_minimized ':' ')+(currentView==='schedule' ? 'navbar-btn-selected':'')} 
			name='schedule'
			onClick={handleViewChange}>Schedule</button>
		</span>
		<span>
			<i className={'bi bi-journal navbar-menulist-btn-icon '+'dark-fgcolor'} />
			<button className={'dark-fgcolor navbar-menulist-btn'+(navbarCollapsed ? ' nvmlbtn_minimized ':' ')+(currentView==='notes' ? 'navbar-btn-selected':'')} 
			name='notes'
			onClick={handleViewChange}>Notes</button>
		</span>
	</div>
	<br />
	<div className={'navbar-menulist bottom-line flex '+(navbarCollapsed ? 'nvml_collapsed':'')}>
		<span>
			<i className={'bi bi-gear navbar-menulist-btn-icon '+'dark-fgcolor'} />
			<button className={'dark-fgcolor navbar-menulist-btn'+(navbarCollapsed ? ' nvmlbtn_minimized ':' ')+(currentView==='settings' ? 'navbar-btn-selected':'')} 
			name='settings'
			onClick={handleViewChange}>Settings</button>
		</span>
		<span>
			<i className={'bi bi-'+(theme==='dark' ? 'moon':'sun')+' nvmltheme_'+theme+' '+'dark-fgcolor'} />
			<button className={'dark-fgcolor navbar-menulist-btn'+(navbarCollapsed ? ' nvmlbtn_minimized ':' ')} 
			onClick={toggleTheme}>{settings.general.theme==='dark' ? 'Dark':'Light'} mode</button>
		</span>
	</div>
	<div className={'navbar-menulist flex '+(navbarCollapsed ? 'nvml_collapsed':'')}>
		<br />
		<span>
			<i className={'bi bi-box-arrow-left navbar-menulist-btn-icon '+'dark-fgcolor'} />
			<button className={'dark-fgcolor navbar-menulist-btn'+(navbarCollapsed ? ' nvmlbtn_minimized ':' ')} 
			onClick={signOutClicked}>Sign out</button>
		</span>
	</div>

	</nav>
  )
}


