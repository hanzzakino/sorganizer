export default function TaskBox({task, theme}) {

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

	const toWeekDay = ['SUN','MON','TUE','WED','THU','FRI','SAT']

	

  	return (
	 <div key={task.id} className='subject-task-item'>
		<i className={'bi bi-circle-fill subject-task-dot '+getColor(task.data.deadline)}/>
		<p className='subject-task-item-deadline'>{(+timestampToDate(task.data.deadline).day) + '/' + (timestampToDate(task.data.deadline).month+1)+'/'+timestampToDate(task.data.deadline).year+' - '}</p>
		<p className='subject-task-item-name'>
		{task.data.name.length < 20 ? (task.data.name):(task.data.name.slice(0,20)+'...')}
		</p>
	</div>
  )
}
