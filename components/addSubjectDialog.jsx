import {useState} from 'react'
import {Timestamp} from 'firebase/firestore'
import {useFirestoreData} from '../context/FirestoreDataContext'
import { toast } from 'react-toastify'


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
	const [emptyfield, setEmptyfield] = useState({
		code : false,
		name : false,
		teacher : false, 
		scheduleTime: false
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

		const schedTFR = toDecimalTime(scheduleTimeFrom)
		const schedTTO = toDecimalTime(scheduleTimeTo)
		let codeVerified = false
		let nameVerified = false
		let schedVerified = false

		if(code === ''){
			toast('Subject Code empty',{
				position : 'top-left',
				autoClose : 5000,
				theme : theme,
				type : 'error',
				hideProgressBar : true
			})
			setEmptyfield(prevState => ({
				...prevState,
				code : true
			}))
		} else {
			setEmptyfield(prevState => ({
				...prevState,
				code : false
			}))
			codeVerified = true
		}


		if(name === ''){
			toast('Subject Name empty',{
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


		if(schedTTO-schedTFR < 0){
			toast('Invalid Time Schedule',{
				position : 'top-left',
				autoClose : 5000,
				theme : theme,
				type : 'error',
				hideProgressBar : true
			})
			setEmptyfield(prevState => ({
				...prevState,
				scheduleTime : true
			}))
		} else {
			setEmptyfield(prevState => ({
				...prevState,
				scheduleTime : false
			}))
			schedVerified = true
		}

		if(codeVerified && nameVerified && schedVerified){
			const newSubject = {
				code,
				name,
				teacher,
				scheduleDay,
				scheduleTimeFrom : schedTFR,
				scheduleTimeTo : schedTTO,
			}
			//add Sub in firestore here
			addSubject(newSubject)
			setFormData({
				code : '',
				name : '',
				teacher : '',
				scheduleDay : 0,
				scheduleTimeFrom : '07:00',
				scheduleTimeTo : '08:00',
			})
			closeDialog()
		}
		
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
						 className={'addsubject-dialog-form-text '+(emptyfield.code ? 'empty-field-error':'')}
						 type='text' 
						 placeholder='Subject Code'
						 id='code'
						 value={code}
						 onChange={onChange}
						 />
						 <input
						 className={'addsubject-dialog-form-text '+(emptyfield.name ? 'empty-field-error':'')}
						 type='text' 
						 placeholder='Subject Name'
						 id='name'
						 value={name}
						 onChange={onChange}
						 />
						 <input
						 className={'addsubject-dialog-form-text '+(emptyfield.teacher ? 'empty-field-error':'')}
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
							 className={'addsubject-dialog-form-date '+(emptyfield.scheduleTime ? 'empty-field-error':'')}
							 type='time' 
							 id='scheduleTimeFrom'
							 value={scheduleTimeFrom}
							 onChange={onTimeChange}
							 />
							 <input
							 className={'addsubject-dialog-form-date '+(emptyfield.scheduleTime ? 'empty-field-error':'')}
							 type='time' 
							 id='scheduleTimeTo'
							 value={scheduleTimeTo}
							 onChange={onTimeChange}
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