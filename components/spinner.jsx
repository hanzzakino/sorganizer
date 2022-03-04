
export default function Spinner({theme, spinnerOnly=false}) {
  return (
    <div className={spinnerOnly ? 'spinner dark-spinner':(theme+'-bg-spinner flex vertical-center horizontal-center')}>
      {spinnerOnly ? '':<div className={'spinner dark-spinner'}></div>}
    </div>
  )
}
