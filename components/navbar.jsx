
import {useFirestoreData} from '../context/FirestoreDataContext'
import {useDashboardContext} from '../context/DashboardContext'
import {useAuth} from '../context/AuthUserContext'
import {useSettings} from '../context/SettingsContext'


export default function Navbar({theme, collapsed}) {
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
	className={collapsed ? ('navbar-collapsed '+theme+'-bg2color'):('navbar '+theme+'-bg2color')}
	>

	<div className={theme+'-fgcolor'}>
		<p>SOrganizer</p>
	</div>

	<div className={collapsed ? 'navbar-menulist-collapsed bottom-line flex':'navbar-menulist bottom-line flex'}>
		<span >
			<i className={'bi bi-grid navbar-menulist-btn-icon '+theme+'-fgcolor'} />
			<button className={collapsed ? theme+'-fgcolor navbar-menulist-btn-collapsed':theme+'-fgcolor navbar-menulist-btn'} onClick={() => setDashboardView('subjects')}>Subjects</button>
		</span>
		<span>
			<i className={'bi bi-card-checklist navbar-menulist-btn-icon '+theme+'-fgcolor'} />
			<button className={collapsed ?  theme+'-fgcolor navbar-menulist-btn-collapsed': theme+'-fgcolor navbar-menulist-btn'} onClick={() => setDashboardView('todo')}>To&#8211;do</button>
		</span>
		<span>
			<i className={'bi bi-calendar-week navbar-menulist-btn-icon '+theme+'-fgcolor'} />
			<button className={collapsed ?  theme+'-fgcolor navbar-menulist-btn-collapsed': theme+'-fgcolor navbar-menulist-btn'} onClick={() => setDashboardView('schedule')}>Schedule</button>
		</span>
		<span>
			<i className={'bi bi-journal navbar-menulist-btn-icon '+theme+'-fgcolor'} />
			<button className={collapsed ?  theme+'-fgcolor navbar-menulist-btn-collapsed': theme+'-fgcolor navbar-menulist-btn'} onClick={() => setDashboardView('notes')}>Notes</button>
		</span>
	</div>
	<br />
	<div className={collapsed ? 'navbar-menulist-collapsed bottom-line flex':'navbar-menulist bottom-line flex'}>
		<span>
			<i className={'bi bi-gear navbar-menulist-btn-icon '+theme+'-fgcolor'} />
			<button className={collapsed ?  theme+'-fgcolor navbar-menulist-btn-collapsed': theme+'-fgcolor navbar-menulist-btn'} onClick={() => setDashboardView('settings')}>Settings</button>
		</span>
		<span>
			<i className={'bi bi-'+(theme==='dark' ? 'moon':'sun')+' navbar-menulist-btn-icon-animated-'+theme+' '+theme+'-fgcolor'} />
			<button className={collapsed ?  theme+'-fgcolor navbar-menulist-btn-collapsed': theme+'-fgcolor navbar-menulist-btn'} onClick={toggleTheme}>{settings.general.theme==='dark' ? 'Dark':'Light'} mode</button>
		</span>
	</div>
	<div className={collapsed ? 'navbar-menulist-collapsed flex':'navbar-menulist flex'}>
		<br />
		<span>
			<i className={'bi bi-box-arrow-left navbar-menulist-btn-icon '+theme+'-fgcolor'} />
			<button className={collapsed ?  theme+'-fgcolor navbar-menulist-btn-collapsed': theme+'-fgcolor navbar-menulist-btn'} onClick={signOutClicked}>Sign out</button>
		</span>
	</div>

	</nav>
  )
}
