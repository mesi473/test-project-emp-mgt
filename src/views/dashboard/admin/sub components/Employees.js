import React from 'react'
import SideBar from '../SideBar'
import MainArea from '../MainArea'

export default function Employees() {
  return (
    <div className="w-full h-full flex flex-row">
      <SideBar/>
      <MainArea/>
    </div>
  )
}
