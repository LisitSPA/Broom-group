import React from 'react'
import { TopBarContainer } from './ActionBars'
import { Grid } from './Grid'

const MatrixContainer = () => {
  return (
    <div className='flex flex-col w-5/6 bg-gray-50 h-screen'>
      <TopBarContainer />
      <Grid />
    </div>
  )
}

export default MatrixContainer