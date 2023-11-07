import React from 'react'
import StickyGridHeader from './StickyGridHeader'
import Matrix from './Matrix'

const Grid = () => {
  return (
    <div className="grid auto-cols-max auto-rows-max w-full h-screen relative overflow-x-scroll">
      <StickyGridHeader />
      <Matrix />
    </div>
  )
}

export default Grid