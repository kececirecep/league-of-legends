import React from 'react'
import {Routes, Route} from "react-router-dom"
import HeroDetails from './HeroDetails'

const Routes = () => {
  return (
    <div> 
      <Routes>
        <Route path='/hero-details' element={<HeroDetails />} />
      </Routes>
    </div>
  )
}

export default Routes