
import {useState, useEffect} from 'react'
import TaskBox from './taskBox'
import {useFirestoreData} from '../../context/FirestoreDataContext'
import AddTaskDialog from '../addTaskDialog'

export default function SubjectPanel({onBackClick, theme}) {
	const {selectedSubject, updateSelectedSubject} = useFirestoreData()
	const [editMode, setEditMode] = useState(false)
	const [taskGroup, setTaskGroup] = useState({
		dueDate : [],
		thisWeek : [],
		nextWeek : []
	})
	const [dueDateExpanded, setDueDateExpanded] = useState(true)
	const [thisWeekExpanded, setThisWeekExpanded] = useState(true)
	const [nextWeekExpanded, setNextWeekExpanded] = useState(true)
	const [addTaskDialogVisible, setAddTaskDialogVisible] = useState(false)
	const dueDateToggle = () => {
		setDueDateExpanded(!dueDateExpanded)
	}
	const thisWeekToggle = () => {
		setThisWeekExpanded(!thisWeekExpanded)
	}
	const nextWeekToggle = () => {
		setNextWeekExpanded(!nextWeekExpanded)
	}

	const getColor = (submission) => {
		const dateSub = submission.toDate()
		const dateNow = Date.now()
		if(dateSub<dateNow){
			return 'task_red'
		} else if(dateSub-dateNow<604800000){
			return 'task_orange'
		} else {
			return 'task_green'
		}
	}

	const onDialogClose = () => {
		setAddTaskDialogVisible(false)
	}

	const onDialogOpen = () => {
		setAddTaskDialogVisible(true)
	}

	useEffect(()=>{
		setTaskGroup({
			dueDate : [],
			thisWeek : [],
			nextWeek : []
		})
		selectedSubject.tasks.forEach((task) => {
			if(getColor(task.data.deadline) === 'task_red'){
				setTaskGroup((prevState) => ({
					...prevState,
					dueDate : [task, ...prevState.dueDate]
				}))
			}else if(getColor(task.data.deadline) === 'task_green'){
				setTaskGroup((prevState) => ({
					...prevState,
					nextWeek : [task, ...prevState.nextWeek]
				}))
			} else {
				setTaskGroup((prevState) => ({
					...prevState,
					thisWeek : [task, ...prevState.thisWeek]
				}))
			}

		})
	},[selectedSubject])

	const toClockTime = (num) => {
		const hour = Math.floor(num)
		const min = Math.round((num-hour)*60)
		const AMPM = 'AM'
		if(num >= 12){
			AMPM = 'PM'
		}
		if(hour%12 === 0){
			hour = 12
		} else {
			hour = hour % 12
		}

		if(min.toString().length === 1){
			return hour.toString()+':0'+min.toString()+' '+AMPM
		} else {
			return hour.toString()+':'+min.toString()+' '+AMPM
		}
	}


	const toWeekDay = ['SUN','MON','TUE','WED','THU','FRI','SAT']

	const editModeChange = (e) => {
		setEditMode((prevState) => !prevState)
	}

  	return (
	  	<div className='subject-area'>


	  		<AddTaskDialog subject={selectedSubject} closeDialog={onDialogClose} theme={theme} hidden={!addTaskDialogVisible}/>

	  		<button className='subject-addtask-button' onClick={onDialogOpen}>
	  			<h1>{'+'}</h1>
	  			<p>Add Task</p>
	  		</button>

	  		<button className='subject-editsub-button' onClick={editModeChange}>
	  			<h1><i className='bi bi-pencil-square' /></h1>
	  			<p >Edit Subject</p>
	  		</button>
		  	

		  	<div className='subject-header'>
				<div className='subject-backbtn' onClick={onBackClick}>
					<p><i className='bi bi-chevron-left'/>&nbsp;All Subjects</p>
				</div>	
				<p className={'subject-editbtn '+(editMode ? 'dark-accentfgcolor3':'dark-fgcolor')}><i className='bi bi-pencil-square' /> Temporary Edit indicator</p>
			</div>

			<div className={'subject-card '+(theme+'-fgcolor ')+(theme+'-accentstroke-focused')}>
				{/*<p className='subject-card-title'><strong>{subject.data.code.toUpperCase()+' -'}</strong>&nbsp;{(subject.data.name.length < 50 ? subject.data.name:(subject.data.name.slice(0,50)+'...'))}</p>*/}
				<p className='subject-card-code'>{selectedSubject.data.code.toUpperCase()}</p>
				<p className='subject-card-name'>{selectedSubject.data.name}</p>
				<span className='subject-card-detail2'>
					<p>{selectedSubject.data.teacher}</p>
					<p>{toWeekDay[selectedSubject.data.scheduleDay]+' '+toClockTime(selectedSubject.data.scheduleTimeFrom)+' - '+toClockTime(selectedSubject.data.scheduleTimeTo)}</p>
				</span>

				<br /><br />

				<div className='subject-task-group'>
					<span className='subject-task-group-title'><i className={'bi bi-circle-fill subject-task-dot task_red'}/>&nbsp;Due date <button onClick={dueDateToggle}><i className={dueDateExpanded ? 'bi bi-chevron-up':'bi bi-chevron-down'}/></button></span>
					
					<div className={'subject-task-group-items '+(dueDateExpanded ? '':'stgi_collapsed')}>
						{
							taskGroup.dueDate.length>0 ? taskGroup.dueDate.map((task) =>
								<TaskBox task={task} theme={theme} key={task.id} subjectID={selectedSubject.id}/>
							):<p className='subject-task-noitem'><br />No tasks</p>
						}
					</div>
				</div>
				<div className='subject-task-group'>
					<span className='subject-task-group-title'><i className={'bi bi-circle-fill subject-task-dot task_orange'}/>&nbsp;This week <button onClick={thisWeekToggle}><i className={thisWeekExpanded ? 'bi bi-chevron-up':'bi bi-chevron-down'}/></button></span>
					
					<div className={'subject-task-group-items '+(thisWeekExpanded ? '':'stgi_collapsed')}>
						{
							taskGroup.thisWeek.length>0 ? taskGroup.thisWeek.map((task) =>
								<TaskBox task={task} theme={theme} key={task.id} subjectID={selectedSubject.id}/>
							):<p className='subject-task-noitem'><br />No tasks</p>
						}
					</div>
				</div>
				<div className='subject-task-group'>
					<span className='subject-task-group-title'><i className={'bi bi-circle-fill subject-task-dot task_green'}/>&nbsp;Next week <button onClick={nextWeekToggle}><i className={nextWeekExpanded ? 'bi bi-chevron-up':'bi bi-chevron-down'}/></button></span>
					
					<div className={'subject-task-group-items '+(nextWeekExpanded ? '':'stgi_collapsed')}>
						{
							taskGroup.nextWeek.length>0 ? taskGroup.nextWeek.map((task) =>
								<TaskBox task={task} theme={theme} key={task.id} subjectID={selectedSubject.id}/>
							):<p className='subject-task-noitem'><br />No tasks</p>
						}
					</div>
				</div>

			</div>
			<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
			<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
		</div>
  )
}
