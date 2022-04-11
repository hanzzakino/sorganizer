import {useFirestoreData} from '../../context/FirestoreDataContext'
import {Timestamp} from 'firebase/firestore'

export default function TaskBox({task, theme, subjectID}) {
	const {addSubject} = useFirestoreData()
	const timestampToDate = (timestamp) => {
		const ts = timestamp.toDate()
		const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		const weekDayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		const date =({
			hour : ts.getHours(),
			minute : ts.getMinutes(),
			seconds : ts.getSeconds(),
			month : ts.getMonth(),
			monthWord : monthList[ts.getMonth()],
			day : ts.getDate(),
			dayOfWeek : ts.getDay(),
			dayOfWeekWord : weekDayList[ts.getDay()],
			year : ts.getFullYear()
		})

		return date
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

	const onDelete = () => {
		if(window.confirm('Are you sure to delete this item?')){
			// const newSubject = {
			// 	code : 'NEWSUB',
			// 	name : 'sECOND New Subject',
			// 	scheduleDay : 0,
			// 	scheduleTimeFrom : 7.5,
			// 	scheduleTimeTo : 10.5,
			// 	teacher : 'Hanz Christian Aquino'
			// }
			// addSubject(newSubject)
			console.log('Deleted:','subjects/'+subjectID+'/tasks/'+task.id)
		} else {
			console.log('not confirmed')
		}
	}

	const toWeekDay = ['SUN','MON','TUE','WED','THU','FRI','SAT']

	

  	return (
	 <div key={task.id} className={'task-box '+theme+'-bg3color'}>
	 	<span className='task-box-header'>
	 		<p className='task-box-name'>{task.data.name}</p>
		 	<button className='task-box-delete' onClick={onDelete}>&times;</button>
		</span>
		<p className='task-box-description'>{'- '+task.data.description}</p>
		<p className={'task-box-deadline '+getColor(task.data.deadline)}>{'Deadline: '+timestampToDate(task.data.deadline).monthWord+' '+timestampToDate(task.data.deadline).day+', '+timestampToDate(task.data.deadline).year}</p>
	</div>
  )
}
