
import {useState, useEffect} from 'react'
import TaskBox from './taskBox'
import {useFirestoreData} from '../../context/FirestoreDataContext'
import AddTaskDialog from '../addTaskDialog'
import EditSubjectDialog from '../editSubjectDialog'

export default function TasksPanel({theme, subjects, navbarCollapsed}) {
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
		subjects.forEach((subj) => {
			subj.tasks.forEach((task) => {
				if(getColor(task.data.deadline) === 'task_red'){
					setTaskGroup((prevState) => ({
						...prevState,
						dueDate : [[task, subj], ...prevState.dueDate]
					}))
				}else if(getColor(task.data.deadline) === 'task_green'){
					setTaskGroup((prevState) => ({
						...prevState,
						nextWeek : [[task, subj], ...prevState.nextWeek]
					}))
				} else {
					setTaskGroup((prevState) => ({
						...prevState,
						thisWeek : [[task, subj], ...prevState.thisWeek]
					}))
				}
	
			})

		})
		


	},[subjects])

	
  	return (
		<div className='subjects-area'>
			<div className='subject-area'>

				
				

				<AddTaskDialog closeDialog={onDialogClose} theme={theme} hidden={!addTaskDialogVisible}/>
				<div className={'subjects-area '+(!navbarCollapsed ? 'sa_collapsed':'')}>
				</div>

				<div className={'subject-card '+(theme+'-fgcolor ')+(theme+'-accentstroke-focused')}>

					<p className='subject-card-code'>All Tasks</p>
					<br /><br /><br />


					<div className='subject-task-group'>
							<span className='subject-task-group-title'><i className={'bi bi-circle-fill subject-task-dot task_red'}/>&nbsp;Due date <button onClick={dueDateToggle}><i className={dueDateExpanded ? 'bi bi-chevron-up':'bi bi-chevron-down'}/></button></span>
							
							<div className={'subject-task-group-items '+(dueDateExpanded ? '':'stgi_collapsed')}>
								{
									taskGroup.dueDate.length>0 ? taskGroup.dueDate.map((task) =>
										<TaskBox task={task[0]} theme={theme} key={task[0].id} subjectID={task[1].id}/>
									):<p className='subject-task-noitem'><br />No tasks</p>
								}
							</div>

							<div className='subject-task-group'>
								<span className='subject-task-group-title'><i className={'bi bi-circle-fill subject-task-dot task_orange'}/>&nbsp;This week <button onClick={thisWeekToggle}><i className={thisWeekExpanded ? 'bi bi-chevron-up':'bi bi-chevron-down'}/></button></span>
								
								<div className={'subject-task-group-items '+(thisWeekExpanded ? '':'stgi_collapsed')}>
									{
										taskGroup.thisWeek.length>0 ? taskGroup.thisWeek.map((task) =>
											<TaskBox task={task[0]} theme={theme} key={task[0].id} subjectID={task[1].id}/>
										):<p className='subject-task-noitem'><br />No tasks</p>
									}
								</div>
							</div>

							<div className='subject-task-group'>
								<span className='subject-task-group-title'><i className={'bi bi-circle-fill subject-task-dot task_green'}/>&nbsp;Next week <button onClick={nextWeekToggle}><i className={nextWeekExpanded ? 'bi bi-chevron-up':'bi bi-chevron-down'}/></button></span>
								
								<div className={'subject-task-group-items '+(nextWeekExpanded ? '':'stgi_collapsed')}>
									{
										taskGroup.nextWeek.length>0 ? taskGroup.nextWeek.map((task) =>
											<TaskBox task={task[0]} theme={theme} key={task[0].id} subjectID={task[1].id}/>
										):<p className='subject-task-noitem'><br />No tasks</p>
									}
								</div>
							</div>
					</div>
				</div>       
		
				<button className='subject-addtask-button' onClick={onDialogOpen}>
					<h1>{'+'}</h1>
					<p>Add Task</p>
				</button>


				
				<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
			</div>
		</div>
  )
}
