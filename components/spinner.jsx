
export default function Spinner({theme, currentTask, spinnerOnly=false}) {
  return (
    <div className={spinnerOnly ? ('spinner '+theme+'-spinner'):(theme+'-bg-spinner flex vertical-center horizontal-center')}>
      {spinnerOnly ? '':<div className={'spinner '+theme+'-spinner'}></div>}
      {!spinnerOnly && <p className={theme+'-spinner-text'}>{currentTask}</p>}
    </div>
  )
}
