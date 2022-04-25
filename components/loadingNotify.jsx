
export default function LoadingNotify({hidden}) {
  return (
    <div className={'loading-notify '+(hidden ? 'hidden':'')}>
      <h4>Loading...</h4>
    </div>
  )
}
