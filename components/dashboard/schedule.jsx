
import {useState, useEffect} from 'react'
import {useFirestoreData} from '../../context/FirestoreDataContext'


export default function SchedulePanel({theme, subjects, navbarCollapsed}) {
	console.log(subjects)

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

  	return (
		<div className='schedule-area'>
			
            <div className={'schedule-card '+(theme+'-fgcolor ')+(theme+'-accentstroke-focused')}>
                <p className='subject-card-code'>Weekly Schedule</p>
                <br /><br />
                <table className='schedule-table'>
                    <tbody>
                        <tr>
                            <th className='schedule-table-cell'> </th>
                            <th className='schedule-table-cell'> Monday</th>
                            <th className='schedule-table-cell'> Tuesday</th>
                            <th className='schedule-table-cell'> Wednesday</th>
                            <th className='schedule-table-cell'> Thursday</th>
                            <th className='schedule-table-cell'> Friday</th>
                            <th className='schedule-table-cell'> Saturday</th>
                            <th className='schedule-table-cell'> Sunday</th>
                        </tr>
                        {
                            subjects.map((sub) => (
                                <tr key={sub.id}>
                                    <th className='schedule-table-cell'>{sub.data.code}</th>
                                    <th className='schedule-table-cell'>{
                                        sub.data.scheduleDay == 1 ? (
                                            toClockTime(sub.data.scheduleTimeFrom)+' - '+toClockTime(sub.data.scheduleTimeTo)
                                        ):''
                                    }</th>
                                    <th className='schedule-table-cell'>{
                                        sub.data.scheduleDay == 2 ? (
                                            toClockTime(sub.data.scheduleTimeFrom)+' - '+toClockTime(sub.data.scheduleTimeTo)
                                        ):''
                                    }</th>
                                    <th className='schedule-table-cell'>{
                                        sub.data.scheduleDay == 3 ? (
                                            toClockTime(sub.data.scheduleTimeFrom)+' - '+toClockTime(sub.data.scheduleTimeTo)
                                        ):''
                                    }</th>
                                    <th className='schedule-table-cell'>{
                                        sub.data.scheduleDay == 4 ? (
                                            toClockTime(sub.data.scheduleTimeFrom)+' - '+toClockTime(sub.data.scheduleTimeTo)
                                        ):''
                                    }</th>
                                    <th className='schedule-table-cell'>{
                                        sub.data.scheduleDay == 5 ? (
                                            toClockTime(sub.data.scheduleTimeFrom)+' - '+toClockTime(sub.data.scheduleTimeTo)
                                        ):''
                                    }</th>
                                    <th className='schedule-table-cell'>{
                                        sub.data.scheduleDay == 6 ? (
                                            toClockTime(sub.data.scheduleTimeFrom)+' - '+toClockTime(sub.data.scheduleTimeTo)
                                        ):''
                                    }</th>
                                    <th className='schedule-table-cell'>{
                                        sub.data.scheduleDay == 0 ? (
                                            toClockTime(sub.data.scheduleTimeFrom)+' - '+toClockTime(sub.data.scheduleTimeTo)
                                        ):''
                                    }</th>
                                </tr>
                            
                            ))
                        }
                    </tbody>
                </table>
                
            </div>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
		</div>
  )
}
