export default function AddTaskDialog({theme, subject, hidden, closeDialog}){
	return(
		hidden ? null:(
			<div className={'addtask-dialog-background'}>
				<div className={'addtask-dialog '+theme+'-bg2colorgradient-nohover '+theme+'-fgcolor '}>
					

					<span className='addtask-dialog-header'>
						<p>Add Task</p>
						<button onClick={closeDialog} className='addtask-dialog-close'>&times;</button>
					</span>
					{subject ? (<p>{subject.id}</p>):(<p>No Subject</p>)}
				</div>
			</div>
		)
	)
}