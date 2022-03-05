import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/navbar'

//Context
import {useAuth} from '../context/AuthUserContext'
import {useTheme} from '../context/ThemeContext'

export default function Home() {
  const {theme, toggleTheme} = useTheme()
  return (
    <>
      <Head>
        <title>SOrganizer</title>
        <meta name='description' content='Student Organizer Website for organizing school task, activities, and schedules' />
        <link rel="manifest" href="/manifest.json" />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={theme+'-bg'}></div>

      <main>
        <div className='container'>
          <div className="row">
            <div className="column">
              <Link href='/user'><a  className='dark-fgcolor'>User </a></Link>
              <Link href='/user/sign-in'><a  className='dark-fgcolor'>Sign In </a></Link>
              <Link href='/user/sign-up'><a  className='dark-fgcolor'>Sign Up </a></Link>
              </div>
            <div className="column">
              <Link href='/user/forgot-password'><a  className='dark-fgcolor'>Forgot Password </a></Link>
            </div>
          </div>
        </div>
      </main>

    </>
  )
}
