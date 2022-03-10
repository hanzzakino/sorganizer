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
          <div className="row">
            <div className="column">
              <Link href='/user'><a  className={settings.general.theme+'-fgcolor'}>User </a></Link>
              <Link href='/user/sign-in'><a  className={settings.general.theme+'-fgcolor'}>Sign In </a></Link>
              <Link href='/user/sign-up'><a  className={settings.general.theme+'-fgcolor'}>Sign Up </a></Link>
              </div>
            <div className="column">
              <Link href='/user/forgot-password'><a  className={settings.general.theme+'-fgcolor'}>Forgot Password </a></Link>
            </div>
          </div>
        </div>
      </main>

    </>
  )
}
