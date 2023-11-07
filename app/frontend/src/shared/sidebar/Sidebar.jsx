import React, {
  useState,
} from 'react'
import { Header, UserProfile, SidebarItem } from './components'
import { BriefcaseIcon, BeakerIcon, CircleStackIcon } from '../assets/Icons'

const Sidebar = () => {
  return (
    <div className='flex flex-col justify-between h-screen bg-NavyBlue text-white w-1/6 shadow-xl shrink-0 z-40'>
      <div>
        <Header />
        <div className="mt-5 grid gap-2">
          <SidebarItem
            icon={<CircleStackIcon />}
            title='Administrar datos'
            path='/administrar_datos'
          />

          <SidebarItem
            icon={<BriefcaseIcon />}
            title='Explorador de sociedades'
            path='/'
          />

          <SidebarItem
            icon={<BeakerIcon />}
            title='Simular escenarios'
            path='/simular_escenarios'
          />
        </div>
      </div>
      <UserProfile />
    </div>
  )
}

export default Sidebar