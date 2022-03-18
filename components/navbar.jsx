
import {useFirestoreData} from '../context/FirestoreDataContext'
import {useDashboardContext} from '../context/DashboardContext'
import {useAuth} from '../context/AuthUserContext'
import {useSettings} from '../context/SettingsContext'


export default function Navbar({theme, navbarCollapsed}) {
	const {signOut} = useAuth()
	const {settings, toggleTheme} = useSettings()
	const {currentView, setDashboardView} = useDashboardContext()
	const {clearData} = useFirestoreData()

	const signOutClicked = () => {
		signOut()
		clearData()
	}

	return (	
	<nav className={'dark-bg2color navbar '+(navbarCollapsed ? 'nv_collapsed ':'')}>

	<div className={'dark-fgcolor navbar-logo-container'}>
		<div className={'navbar-logo '+(navbarCollapsed ? 'nvlg_collapsed':'')}></div>
		{navbarCollapsed ? <></>:<p className='navbar-logo-text'>SOrganizer</p>}
	</div>

	<div className={'navbar-menulist bottom-line flex '+(navbarCollapsed ? 'nvml_collapsed':'')}>
		<span>
			<i className={'bi bi-grid navbar-menulist-btn-icon '+'dark-fgcolor'} />
			<button className={'dark-fgcolor navbar-menulist-btn'+(navbarCollapsed ? ' nvmlbtn_minimized ':' ')+(currentView==='subjects' ? 'navbar-btn-selected':'')} onClick={() => setDashboardView('subjects')}>Subjects</button>
		</span>
		<span>
			<i className={'bi bi-card-checklist navbar-menulist-btn-icon '+'dark-fgcolor'} />
			<button className={'dark-fgcolor navbar-menulist-btn'+(navbarCollapsed ? ' nvmlbtn_minimized ':' ')+(currentView==='todo' ? 'navbar-btn-selected':'')} onClick={() => setDashboardView('todo')}>To&#8211;do</button>
		</span>
		<span>
			<i className={'bi bi-calendar-week navbar-menulist-btn-icon '+'dark-fgcolor'} />
			<button className={'dark-fgcolor navbar-menulist-btn'+(navbarCollapsed ? ' nvmlbtn_minimized ':' ')+(currentView==='schedule' ? 'navbar-btn-selected':'')} onClick={() => setDashboardView('schedule')}>Schedule</button>
		</span>
		<span>
			<i className={'bi bi-journal navbar-menulist-btn-icon '+'dark-fgcolor'} />
			<button className={'dark-fgcolor navbar-menulist-btn'+(navbarCollapsed ? ' nvmlbtn_minimized ':' ')+(currentView==='notes' ? 'navbar-btn-selected':'')} onClick={() => setDashboardView('notes')}>Notes</button>
		</span>
	</div>
	<br />
	<div className={'navbar-menulist bottom-line flex '+(navbarCollapsed ? 'nvml_collapsed':'')}>
		<span>
			<i className={'bi bi-gear navbar-menulist-btn-icon '+'dark-fgcolor'} />
			<button className={'dark-fgcolor navbar-menulist-btn'+(navbarCollapsed ? ' nvmlbtn_minimized ':' ')+(currentView==='settings' ? 'navbar-btn-selected':'')} onClick={() => setDashboardView('settings')}>Settings</button>
		</span>
		<span>
			<i className={'bi bi-'+(theme==='dark' ? 'moon':'sun')+' nvmltheme_'+theme+' '+'dark-fgcolor'} />
			<button className={'dark-fgcolor navbar-menulist-btn'+(navbarCollapsed ? ' nvmlbtn_minimized ':' ')} onClick={toggleTheme}>{settings.general.theme==='dark' ? 'Dark':'Light'} mode</button>
		</span>
	</div>
	<div className={'navbar-menulist flex '+(navbarCollapsed ? 'nvml_collapsed':'')}>
		<br />
		<span>
			<i className={'bi bi-box-arrow-left navbar-menulist-btn-icon '+'dark-fgcolor'} />
			<button className={'dark-fgcolor navbar-menulist-btn'+(navbarCollapsed ? ' nvmlbtn_minimized ':' ')} onClick={signOutClicked}>Sign out</button>
		</span>
	</div>

	</nav>
  )
}


