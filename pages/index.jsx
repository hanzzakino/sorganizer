import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/navbar'
import Spinner from '../components/spinner'

import { useRouter } from 'next/router'
import {useState, useEffect} from 'react'

//Context
import {useAuth} from '../context/AuthUserContext'
import {useSettings} from '../context/SettingsContext'
import {useFirestoreData} from '../context/FirestoreDataContext'

export default function Home() {
  const {settings, toggleTheme, setLocalSettings} = useSettings()
  const {firestoreLoading, getDataDone, getSubjects, subjects, userData, getUserDataDone, getUserData} = useFirestoreData()
	const {authUser, loading, currentTask, dataWriteDone} = useAuth()
  const router = useRouter()
  
  useEffect(() => {
		if(!loading &&  !authUser && dataWriteDone){
			router.push('/user/sign-in')
		} 
		if (!loading &&  authUser) {
			if(subjects.length===0){
				getSubjects()
			}
			getUserData()
			setLocalSettings()
		}
	}, [authUser, loading, dataWriteDone])

  return authUser && !loading && getDataDone && getUserDataDone ? (
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
  ):(<Spinner theme={settings.general.theme} currentTask={currentTask} />)
}
