export default function SubjectPanel({subject, onBackClick}) {

  	return (
	  	<>
		  	<div>
				<button onClick={onBackClick}><i  className='bi bi-chevron-left'/></button>
				<p>{subject.data.code+' '+subject.data.name} Subject Panel</p>
			</div>
		</>
  )
}
