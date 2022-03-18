

import Image from 'next/image'


export default function NotificationBar({theme, scrolled, navbarCollapsed, userData, panelTitle, authUser}) {

	return (
	<>
		<div className={'notificationbar '+(navbarCollapsed ? 'nb_collapsed ':' ')+(scrolled ? ' nb_scrolled':'')}></div>	
		<div className={'notificationbar-top '+(navbarCollapsed ? 'nbt_collapsed':'')}>
			<div className={'notificationbar-contents '+(scrolled ? 'nbc_scrolled':'')}>
				<span>
					<p>{panelTitle}</p>
				</span>
				 
				<span className={'notificationbar-user-btn '+(navbarCollapsed ? 'nbub_collapsed':'')}>
					<p>Hi!, {userData.firstname+' '+userData.lastname} &nbsp;&nbsp;&nbsp;&nbsp;</p>
					<img src={authUser.photoURL} alt='Profile Picture' width={42} height={42} layout='fill'/>
				</span>
			</div>
		</div>	
		
	</>
  )
}
