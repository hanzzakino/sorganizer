export default function SubjectBox({subject, theme, onSubjectClick}) {

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
		} else {
			return 'task_green'
		}
	}

	const toWeekDay = ['SUN','MON','TUE','WED','THU','FRI','SAT']

	const onClick = () => {
		onSubjectClick(subject)
	}

  	return (
	 <div className={'subject-box '+(theme+'-fgcolor ')+(theme+'-accentstroke')} key={subject.id} onClick={onClick}>
		<p className='subject-title'>{subject.data.code.toUpperCase()+' - '+subject.data.name}</p>
		<p className='subject-prof'>{subject.data.teacher}</p>	
		<p className='subject-sched'>{toWeekDay[subject.data.scheduleDay]+' '+toClockTime(subject.data.scheduleTimeFrom)+' - '+toClockTime(subject.data.scheduleTimeTo)}</p>
		<div className={'subject-task-box '+(theme+'-bg2colorgradient ')}>
			<p className='subject-task-title'>Tasks</p>
			{
				subject.tasks.length>0 ? subject.tasks.filter((it, ix) => ix <= 3).map((task) =>
					
					<div key={task.id} className='subject-task-item'>
						<i className={'bi bi-circle-fill subject-task-dot '+getColor(task.data.deadline)}/>
						<p className='subject-task-item-deadline'>{(+timestampToDate(task.data.deadline).day) + '/' + (timestampToDate(task.data.deadline).month+1)+'/'+timestampToDate(task.data.deadline).year+' - '}</p>
						<p className='subject-task-item-name'>
						{task.data.name.length < 20 ? (task.data.name):(task.data.name.slice(0,20)+'...')}
						</p>
					</div>
				):<p className='subject-task-noitem'>No tasks</p>
			}
			<p className='subject-task-noitem' align='right'>{(subject.tasks.length-4>0 ? ((subject.tasks.length-4) + ' more...'):'')}</p>
		</div>
	</div>
  )
}
