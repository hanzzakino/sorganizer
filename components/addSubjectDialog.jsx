import {useState} from 'react'
import {Timestamp} from 'firebase/firestore'
import {useFirestoreData} from '../context/FirestoreDataContext'


export default function AddSubjectDialog({theme, hidden, closeDialog}){

	const {addSubject, subjects} = useFirestoreData()
	const [formData, setFormData] = useState({
		code : '',
		name : '',
		teacher : '',
		scheduleDay : 0,
		scheduleTimeFrom : '07:00',
		scheduleTimeTo : '08:00',
	})

	const toDecimalTime = (time) => {
		const tempStr = time.split(':')
		const hour = +tempStr[0]
		const minute = (+tempStr[1])/60
		return hour+minute
	}

	const {code, name, scheduleDay, scheduleTimeFrom, scheduleTimeTo, teacher} = formData

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id] : e.target.value
		}))
	}

	const onTimeChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id] : e.target.value
		}))
	}


	const onSelect = (e) => {
		const sel = e.target
		setFormData((prevState) => ({
			...prevState,
			[e.target.id] : +sel.options[sel.selectedIndex].value
		}))
	}

	const onSubmit = (e) => {
		e.preventDefault()

		const newTaskData = {
			code,
		}
		const newSubject = {
			code,
			name,
			teacher,
			scheduleDay,
			scheduleTimeFrom : toDecimalTime(scheduleTimeFrom),
			scheduleTimeTo : toDecimalTime(scheduleTimeTo),
		}
		//add Sub in firestore here
		addSubject(newSubject)

		setFormData({
			code : '',
			name : '',
			teacher : '',
			scheduleDay : 0,
			scheduleTimeFrom : '',
			scheduleTimeTo : '',
		})
		closeDialog()
	}

	return(
		hidden ? null:(
			<div className={'addsubject-dialog-background'}>
				<div className={'addsubject-dialog '+theme+'-bg2colorgradient-nohover '+theme+'-fgcolor '}>
					
					<span className='addsubject-dialog-header'>
						<p>Add Subject</p>
						<button onClick={closeDialog} className='addsubject-dialog-close'>&times;</button>
					</span>

					<form onSubmit={onSubmit} className='addsubject-dialog-form'>
						
						<input
						 className='addsubject-dialog-form-text'
						 type='text' 
						 placeholder='Subject Code'
						 id='code'
						 value={code}
						 onChange={onChange}
						 />
						 <input
						 className='addsubject-dialog-form-text'
						 type='text' 
						 placeholder='Subject Name'
						 id='name'
						 value={name}
						 onChange={onChange}
						 />
						 <input
						 className='addsubject-dialog-form-text'
						 type='text' 
						 placeholder='Subject Teacher'
						 id='teacher'
						 value={teacher}
						 onChange={onChange}
						 />

						<p>{'Schedule:'}</p>
						<select onChange={onSelect} name='scheduleDay' id='scheduleDay' className='addsubject-dialog-form-list'>
							<option value={0}>Sunday</option>
							<option value={1}>Monday</option>
							<option value={2}>Tuesday</option>
							<option value={3}>Wednesday</option>
							<option value={4}>Thursday</option>
							<option value={5}>Friday</option>
							<option value={6}>Saturday</option>
						</select>

						<div className='addsubject-dialog-form-date-container'>
							<input
							 className='addsubject-dialog-form-date'
							 type='time' 
							 id='scheduleTimeFrom'
							 value={scheduleTimeFrom}
							 onChange={onTimeChange}
							 />
							 <input
							 className='addsubject-dialog-form-date'
							 type='time' 
							 id='scheduleTimeTo'
							 value={scheduleTimeTo}
							 onChange={onTimeChange}
							 />
						</div>
						<br /><br />
						<input type='submit' className='btn'/>
					</form>
				</div>
			</div>
		)
	)
}