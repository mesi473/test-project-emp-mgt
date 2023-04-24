import React from 'react'
import { Link } from 'react-router-dom'
export default function SideBar() {
  return (
    <div className="w-1/5 h-full bg-yellow-400">
        <div 
        className="flex flex-col w-4/5 h-full ml-20 mt-32"
        >
            <div
            className="font-bold text-xl mb-40"
            >Employee Managment System</div>
            <ul>
                <li className="font-bold text-lg mt-2 mb-10">
                    <Link to="/dashboard/admin/default">
                        Dashboard
                    </Link>
                </li>
                <li className="font-bold text-lg mt-2 mb-2">
                    <Link to="/dashboard/admin/employees">
                    Employees
                    </Link>
                </li>
            </ul>
        </div>
      </div>
  )
}
