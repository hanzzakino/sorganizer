import NotificationBar from '../notificationBar'

export default function SubjectsPanel({theme, subjects}) {
  return (
  	<>
  	<div className='subjects-area'>
		{ 	
			subjects.length>0 ? subjects.map((subject) => 
				<ul key={subject.id}>
					<li>{subject.data.code}</li>
					<li>{subject.data.name}</li>
					<li>Prof. {subject.data.teacher}</li>
					<li>{subject.data.scheduleDay}</li>
					<li>{subject.data.scheduleTimeFrom} to {subject.data.scheduleTimeTo}</li>
					<li>Tasks
						{
							subject.tasks.length>0 ? subject.tasks.map((task) =>
								<ul key={task.id}>
									<li>{task.data.name}</li>
								</ul>
							):<p>No tasks</p>
						}
					</li>
				</ul>
			):(
				<p>Please Add Subjects</p>
			)
		}
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
