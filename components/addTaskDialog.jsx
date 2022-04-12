import {useState} from 'react'
import {Timestamp} from 'firebase/firestore'
import {useFirestoreData} from '../context/FirestoreDataContext'


export default function AddTaskDialog({theme, subject, hidden, closeDialog}){subject
	const {addTask} = useFirestoreData()
	const [formData, setFormData] = useState({
		name : '',
		description : '',
		deadlineDate : '',
		deadlineTime : '' 
	})
	const {name, description, deadlineDate, deadlineTime} = formData

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id] : e.target.value
		}))
	}

	const onSubmit = (e) => {
		e.preventDefault()
		const ddate = deadlineDate.split('-')
		const dtime = deadlineTime.split(':')
		const deadline = new Date(ddate[0], ddate[1]-1, ddate[2], dtime[0], dtime[1])
		const newTaskData = {
			name,
			description,
			isDone : false,
			deadline : Timestamp.fromDate(deadline)
		}
		addTask(subject.id,newTaskData)
		setFormData({
			name : '',
			description : '',
			deadlineDate : '',
			deadlineTime : '' 
		})
		closeDialog()
	}

	return(
		hidden ? null:(
			<div className={'addtask-dialog-background'}>
				<div className={'addtask-dialog '+theme+'-bg2colorgradient-nohover '+theme+'-fgcolor '}>
					

					<span className='addtask-dialog-header'>
						<p>Add Task</p>
						<button onClick={closeDialog} className='addtask-dialog-close'>&times;</button>
					</span>
					{subject ? (<p>{subject.id}</p>):(<p>No Subject</p>)}
					<form onSubmit={onSubmit}>
						<input
						 type='text' 
						 placeholder='Task Name'
						 id='name'
						 value={name}
						 onChange={onChange}
						 />
						 <input
						 type='text' 
						 placeholder='Description'
						 id='description'
						 value={description}
						 onChange={onChange}
						 />
						 <input
						 type='date' 
						 id='deadlineDate'
						 value={deadlineDate}
						 onChange={onChange}
						 />
						 <input
						 type='time' 
						 id='deadlineTime'
						 value={deadlineTime}
						 onChange={onChange}
						 />
						 <input type='submit' />
					</form>
				</div>
			</div>
		)
	)
}