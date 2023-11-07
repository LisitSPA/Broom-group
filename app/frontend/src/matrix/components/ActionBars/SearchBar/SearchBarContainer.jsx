import React from 'react'
import SaveChangesButtons from './SaveChangesButtons'
import SearchBar from './SearchBar'

const SearchBarContainer = () => {
  return (
    <div className="bg-white w-8/12 flex p-3 justify-between items-center">
      <div className="flex w-5/12 gap-1">
        <SaveChangesButtons />
      </div>

      <div className="flex w-7/12 gap-1 ">
        <SearchBar />        
      </div>
    </div>
  )
}

export default SearchBarContainer