import {useState} from 'react'
import {Timestamp} from 'firebase/firestore'
import {useFirestoreData} from '../context/FirestoreDataContext'
import { toast } from 'react-toastify'

export default function AddTaskDialog({theme, subject, hidden, closeDialog}){

	const {addTask, subjects} = useFirestoreData()
	const [formData, setFormData] = useState({
		name : '',
		description : '',
		deadlineDate : '',
		deadlineTime : '' 
	})
	const [emptyfield, setEmptyfield] = useState({
		name : false,
		description : false,
		deadlineField : false
	})
	const [selectedSubjID, setSelecetedSubjID] = useState(null)
	const {name, description, deadlineDate, deadlineTime} = formData

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id] : e.target.value
		}))
	}

	const onSelect = (e) => {
		const sel = e.target
		setSelecetedSubjID(sel.options[sel.selectedIndex].value)
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


		let nameVerified = false
		let deadlineVerified = false

		if(name === ''){
			toast('Task Name empty',{
				position : 'top-left',
				autoClose : 5000,
				theme : theme,
				type : 'error',
				hideProgressBar : true
			})
			setEmptyfield(prevState => ({
				...prevState,
				name : true
			}))
		} else {
			setEmptyfield(prevState => ({
				...prevState,
				name : false
			}))
			nameVerified = true
		}

		if(deadlineDate === '' || deadlineTime === '' || (deadline-Date.now() < 0)){
			toast('Invalid Task Deadline empty',{
				position : 'top-left',
				autoClose : 5000,
				theme : theme,
				type : 'error',
				hideProgressBar : true
			})
			setEmptyfield(prevState => ({
				...prevState,
				deadlineField : true
			}))
		} else {
			setEmptyfield(prevState => ({
				...prevState,
				deadlineField : false
			}))
			deadlineVerified = true
		}

		if(nameVerified && deadlineVerified){
			if(selectedSubjID){
				addTask(selectedSubjID,newTaskData)
			} else if(subject) {
				addTask(subject.id,newTaskData)
			}
			setFormData({
				name : '',
				description : '',
				deadlineDate : '',
				deadlineTime : '' 
			})
			closeDialog()
		}
		
	}

	const onClose = () => {
		setFormData({
			name : '',
			description : '',
			deadlineDate : '',
			deadlineTime : '' 
		})
		setEmptyfield({
			name : false,
			description : false,
			deadlineField : false
		})
		closeDialog()
	}

	return(
		hidden ? null:(
			<div className={'addtask-dialog-background'}>
				<div className={'addtask-dialog '+theme+'-bg2colorgradient-nohover '+theme+'-fgcolor '}>
					

					<span className='addtask-dialog-header'>
						<p>Add Task</p>
						<button onClick={onClose} className='addtask-dialog-close'>&times;</button>
					</span>
					<form onSubmit={onSubmit} className='addtask-dialog-form'>
						
						{subject ? (<p>{subject.data.code.toUpperCase()+' - '+subject.data.name}</p>):(
							<>
							<label htmlFor="subjectLists">Choose Subject</label>
							<select onChange={onSelect} name="subjectLists" id="subjectLists" className='addtask-dialog-form-list'>
								{subjects.length > 0 ? <option disabled selected>{'-- Select Subject --'}</option>:null}
								{subjects.length > 0 ? (
										subjects.map((subj)=><option key={subj.id} value={subj.id}>{subj.data.code.toUpperCase()+' - '+(subj.data.name.length < 35 ? subj.data.name:subj.data.name.slice(0,35)+'...')}</option>)
									):<option value="">No Subjects</option>
								}
							</select>
							</>
						)}

						<input
						 className={'addtask-dialog-form-text '+(emptyfield.name ? 'empty-field-error':'')}
						 type='text' 
						 placeholder='Task Name'
						 id='name'
						 value={name}
						 onChange={onChange}
						 />
						 <textarea
						 className={'addtask-dialog-form-text-description '+(emptyfield.description ? 'empty-field-error':'')}
						 placeholder='Description'
						 id='description'
						 value={description}
						 onChange={onChange}
						 />
						 <p>{'Deadline:'}</p>
						 <div className='addtask-dialog-form-date-container'>
							 <input
							 className={'addtask-dialog-form-date '+(emptyfield.deadlineField ? 'empty-field-error':'')}
							 type='date' 
							 id='deadlineDate'
							 value={deadlineDate}
							 onChange={onChange}
							 />
							 <input
							 className={'addtask-dialog-form-date '+(emptyfield.deadlineField ? 'empty-field-error':'')}
							 type='time' 
							 id='deadlineTime'
							 value={deadlineTime}
							 onChange={onChange}
							 />
						 </div>
						 <br />
						 <input type='submit' className='btn' value='Add'/>
					</form>
				</div>
			</div>
		)
	)
}