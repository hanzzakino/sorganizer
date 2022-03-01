import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/navbar'


export default function Home() {
  return (
    <>
      <Head>
        <title>SOrganizer</title>
        <meta name='description' content='Student Organizer Website for organizing school task, activities, and schedules' />
        <link rel="manifest" href="/manifest.json" />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      
      <Navbar />
      <main className='dark-bgcolor'>
        <div className='container'>
          <h1 className='dark-fgcolor'>Home</h1>
          <Link href='/user'><a  className='dark-fgcolor'>User </a></Link>
          <Link href='/user/sign-in'><a  className='dark-fgcolor'>Sign In </a></Link>
          <Link href='/user/sign-up'><a  className='dark-fgcolor'>Sign Up </a></Link>
          <Link href='/user/forgot-password'><a  className='dark-fgcolor'>Forgot Password </a></Link>
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
      </main>

      <footer>
        hanz
      </footer>
    </>
  )
}
