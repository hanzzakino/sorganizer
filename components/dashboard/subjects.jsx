import {useState, useEffect} from 'react'
import SubjectBox from './subjectBox'
import SubjectPanel from './subject'

export default function SubjectsPanel({theme, subjects, navbarCollapsed}) {

	const [singleSubjectView, setSingleSubjectView] = useState(false)
	const [singleSubject, setSingleSubject] = useState(null)

	useEffect(()=>{
		if(!singleSubject) {
			setSingleSubjectView(false)
		} else {
			setSingleSubjectView(true)
		}
	},[singleSubject])

	const onSubjectClick = (subject) => {
		setSingleSubject(subject)
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	const onBackClick = () => {
		setSingleSubject(null)
	}


  	return (
	  	<>
		  	<div className={'subjects-area '+(!navbarCollapsed ? 'sa_collapsed':'')}>
				{ 	!singleSubjectView ? (
							subjects.length>0 ? subjects.map((subject) => 

								<SubjectBox subject={subject} theme={theme} key={subject.id} onSubjectClick={onSubjectClick}/>

							):(
								<p>Please Add Subjects</p>
							)
						):(
							<>
								{singleSubject ? <SubjectPanel subject={singleSubject} onBackClick={onBackClick}/>:<div>
									<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
									<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
									<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
									<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
									<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
									<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
									<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
									<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
								</div>}
							</>
						)
				}
			</div>
		</>
  )
}
