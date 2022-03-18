
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
	<nav 
	className={navbarCollapsed ? ('navbar-collapsed '+theme+'-bg2color'):('navbar '+theme+'-bg2color')}
	>

	<div className={theme+'-fgcolor navbar-logo-container'}>
		<div className={'navbar-logo'+(navbarCollapsed ? '-collapsed':'')}></div>
		{navbarCollapsed ? <></>:<p className='navbar-logo-text'>SOrganizer</p>}
	</div>

	<div className={navbarCollapsed ? 'navbar-menulist-collapsed bottom-line flex':'navbar-menulist bottom-line flex'}>
		<span>
			<i className={'bi bi-grid navbar-menulist-btn-icon '+theme+'-fgcolor'} />
			<button className={(navbarCollapsed ? theme+'-fgcolor navbar-menulist-btn-collapsed ':theme+'-fgcolor navbar-menulist-btn ')+(currentView==='subjects' ? 'navbar-btn-selected':'')} onClick={() => setDashboardView('subjects')}>Subjects</button>
		</span>
		<span>
			<i className={'bi bi-card-checklist navbar-menulist-btn-icon '+theme+'-fgcolor'} />
			<button className={(navbarCollapsed ?  theme+'-fgcolor navbar-menulist-btn-collapsed ': theme+'-fgcolor navbar-menulist-btn ')+(currentView==='todo' ? 'navbar-btn-selected':'')} onClick={() => setDashboardView('todo')}>To&#8211;do</button>
		</span>
		<span>
			<i className={'bi bi-calendar-week navbar-menulist-btn-icon '+theme+'-fgcolor'} />
			<button className={(navbarCollapsed ?  theme+'-fgcolor navbar-menulist-btn-collapsed ': theme+'-fgcolor navbar-menulist-btn ')+(currentView==='schedule' ? 'navbar-btn-selected':'')} onClick={() => setDashboardView('schedule')}>Schedule</button>
		</span>
		<span>
			<i className={'bi bi-journal navbar-menulist-btn-icon '+theme+'-fgcolor'} />
			<button className={(navbarCollapsed ?  theme+'-fgcolor navbar-menulist-btn-collapsed ': theme+'-fgcolor navbar-menulist-btn ')+(currentView==='notes' ? 'navbar-btn-selected':'')} onClick={() => setDashboardView('notes')}>Notes</button>
		</span>
	</div>
	<br />
	<div className={navbarCollapsed ? 'navbar-menulist-collapsed bottom-line flex':'navbar-menulist bottom-line flex'}>
		<span>
			<i className={'bi bi-gear navbar-menulist-btn-icon '+theme+'-fgcolor'} />
			<button className={(navbarCollapsed ?  theme+'-fgcolor navbar-menulist-btn-collapsed ': theme+'-fgcolor navbar-menulist-btn ')+(currentView==='settings' ? 'navbar-btn-selected':'')} onClick={() => setDashboardView('settings')}>Settings</button>
		</span>
		<span>
			<i className={'bi bi-'+(theme==='dark' ? 'moon':'sun')+' navbar-menulist-btn-icon-animated-'+theme+' '+theme+'-fgcolor'} />
			<button className={navbarCollapsed ?  theme+'-fgcolor navbar-menulist-btn-collapsed': theme+'-fgcolor navbar-menulist-btn'} onClick={toggleTheme}>{settings.general.theme==='dark' ? 'Dark':'Light'} mode</button>
		</span>
	</div>
	<div className={navbarCollapsed ? 'navbar-menulist-collapsed flex':'navbar-menulist flex'}>
		<br />
		<span>
			<i className={'bi bi-box-arrow-left navbar-menulist-btn-icon '+theme+'-fgcolor'} />
			<button className={navbarCollapsed ?  theme+'-fgcolor navbar-menulist-btn-collapsed': theme+'-fgcolor navbar-menulist-btn'} onClick={signOutClicked}>Sign out</button>
		</span>
	</div>

	</nav>
  )
}
