import {useState, useEffect} from 'react'
import SubjectBox from './subjectBox'
import SubjectPanel from './subject'
import {useFirestoreData} from '../../context/FirestoreDataContext'
import {Timestamp} from 'firebase/firestore'

export default function SubjectsPanel({theme, subjects, navbarCollapsed}) {
	const [singleSubject, setSingleSubject] = useState(null)
	const [singleSubjectView, setSingleSubjectView] = useState(false)

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

	const addNewSubject = () => {
		const newSubject = {
			code : 'SUBJECT1',
			name : 'New Test Subject',
			scheduleDay : 6,
			scheduleTimeFrom : 6,
			scheduleTimeTo : 9,
			teacher : 'New Teacher'
		}
		addSubject(newSubject)
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
								{singleSubject ? <SubjectPanel subject={singleSubject} onBackClick={onBackClick} theme={theme}/>:<div>
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
