
export default function Spinner({theme, spinnerOnly=false}) {
  return (
    <div className={spinnerOnly ? ('spinner '+theme+'-spinner'):(theme+'-bg-spinner flex vertical-center horizontal-center')}>
      {spinnerOnly ? '':<div className={'spinner '+theme+'-spinner'}></div>}
    </div>
  )
}
