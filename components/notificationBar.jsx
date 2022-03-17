

import Image from 'next/image'


export default function NotificationBar({theme, scrolled, collapsed, userData, panelTitle, authUser}) {

	return (
	<>
		<div className={'notificationbar'+(collapsed ? '-collapsed':'')+(scrolled ? '-scrolled':'')}></div>	
		<div className={'notificationbar-top'+(collapsed ? '-collapsed':'')}>
			<div className={'notificationbar-contents'+(scrolled ? '-scrolled':'')}>
				<span>
					<p>{panelTitle}</p>
				</span>
				<span className='notificationbar-user-btn'>
					<p>Hi!, {userData.firstname+' '+userData.lastname} &nbsp;&nbsp;&nbsp;&nbsp;</p>
					<img src={authUser.photoURL} alt='Profile Picture' width={42} height={42} layout='fill'/>
				</span>
			</div>
		</div>	
		
	</>
  )
}
