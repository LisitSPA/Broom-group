import React from 'react'
import LeftTopSelectors from './LeftTopSelectors'
import SearchBarContainer from './SearchBar/SearchBarContainer'

const TopBarContainer = () => {
  return (
    <div className="flex flex-row h-16 z-30">
      <div className="bg-slate-100 fixed h-full w-[calc(27.8vw)] top-0 hidden" />
      <LeftTopSelectors />
      <SearchBarContainer />
    </div>
  )
}

export default TopBarContainer