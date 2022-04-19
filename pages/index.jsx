import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/navbar'

//Context
import {useAuth} from '../context/AuthUserContext'
import {useSettings} from '../context/SettingsContext'

export default function Home() {
  const {settings, toggleTheme} = useSettings()
  return (
    <>
      <Head>
        <title>SOrganizer</title>
        <meta name='description' content='Student Organizer Website for organizing school task, activities, and schedules' />
        <link rel="manifest" href="/manifest.json" />
        <link rel='icon' href='/favicon.svg' />
      </Head>
      <div className={settings.general.theme+'-bg'}></div>

      <main>
        <div className='container'>
          <br /><br /><br /><br />
          <h1 className={settings.general.theme+'-fgcolor'}>SOrganier is still under development</h1>
          
          <div className="row">
            <div className="column">
              
              <Link href='/user/sign-in'><a  className={settings.general.theme+'-fgcolor'}>Get started&nbsp;&nbsp;<i className='bi bi-arrow-right'/></a></Link>
              
              </div>
          </div>

          <br /><br />
          <button onClick={toggleTheme}>Switch theme</button>
        </div>
      </main>

    </>
  )
}
