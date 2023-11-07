import React from 'react'
import FirmsSidebarHeader from './FirmsSidebarHeader'
import MatrixColTitles from './MatrixColTitles'

const StickyGridHeader = () => {
  return (
    <div className="flex sticky top-0 z-20">
      <FirmsSidebarHeader />
      <MatrixColTitles />
    </div>
  )
}

export default StickyGridHeader