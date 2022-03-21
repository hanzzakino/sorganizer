import { useRouter } from 'next/router'

import Image from 'next/image'


export default function NotificationBar({theme, scrolled, navbarCollapsed, userData, panelTitle, authUser}) {

	const router = useRouter()


	const userClick = () => {
		router.push('/user')
	}

	return (
	<>
		<div className={'notificationbar '+(navbarCollapsed ? 'nb_collapsed ':' ')+(scrolled ? ' nb_scrolled':'')}></div>	
		<div className={'notificationbar-top '+(navbarCollapsed ? 'nbt_collapsed':'')}>
			<div className={'dark-fgcolor notificationbar-contents '+(scrolled ? 'nbc_scrolled':'')}>
				<span>
					<p className='notificationbar-title'>{panelTitle}</p>
				</span>
				 
				<span onClick={userClick} className={'notificationbar-user-btn '+(navbarCollapsed ? 'nbub_collapsed':'')}>
					<p className='notificationbar-username'>
						{userData.firstname.length < 14 ? userData.firstname:userData.firstname.slice(0,11)+'...'}
						&nbsp;&nbsp;&nbsp;&nbsp;
					</p>

					{authUser.photoURL==='' ? <div className='notificationbar-subprofilepic'>{userData.firstname.slice(0,1)}</div>:<img className='notificationbar-profilepic' src={authUser.photoURL} alt='Profile Picture'/>}
				</span>
			</div>
		</div>	
		
	</>
  )
}
