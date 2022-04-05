export default function SubjectPanel({subject, onBackClick}) {

  	return (
	  	<div className='subject-area'>
		  	<div className='subject-header'>
				<div className='subject-backbtn' onClick={onBackClick}>
					<p><i className='bi bi-chevron-left'/>&nbsp;All Subjects</p>
				</div>	
				<p className='subject-header-title'><strong>{subject.data.code.toUpperCase()+' -'}</strong>&nbsp;{(subject.data.name.length < 50 ? subject.data.name:(subject.data.name.slice(0,50)+'...'))}</p>
			</div>

			<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
			<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
			<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
			<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
			<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
			<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
			<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
			<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
			<p>HANZ AQUINO</p>
		</div>
  )
}
