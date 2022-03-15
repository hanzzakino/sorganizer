
export default function SubjectsPanel({theme, subjects}) {
  return (
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
	</div>
  )
}
