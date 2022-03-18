import NotificationBar from '../notificationBar'

export default function SubjectsPanel({theme, subjects, navbarCollapsed, userData, scrolled, authUser}) {
  return (
  	<>
  	<NotificationBar navbarCollapsed={navbarCollapsed} userData={userData} scrolled={!scrolled} panelTitle='Subjects' authUser={authUser}/>
  	<div className='subjects-area'>
		{subjects.map((subject) => 
			<ul key={subject.id}>
				<li>{subject.data.code}</li>
				<li>{subject.data.name}</li>
				<li>Prof. {subject.data.teacher}</li>
				<li>{subject.data.scheduleDay}</li>
				<li>{subject.data.scheduleTimeFrom} to {subject.data.scheduleTimeTo}</li>
			</ul>
		)}
		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
		hanzs
	</div>
	</>
  )
}
