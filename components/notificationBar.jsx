export default function NotificationBar({theme, scrolled, collapsed, userData}) {

	return (
	<div className={'notificationbar'+(collapsed ? '-collapsed':'')+(scrolled ? '-scrolled':'')}>
		<p>Hi!, {userData.firstname+' '+userData.lastname}</p>
	</div>
  )
}
