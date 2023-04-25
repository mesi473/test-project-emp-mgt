import React from "react";
import { Link } from "react-router-dom";
export default function SideBar() {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="flex max-[600px]:text-sm font-bold text-3xl text-yellow-400 mb-4">
        Employee Management System
      </div>
      <ul className="flex lg:flex-row sm:flex-col max-[700px]:flex-col sm:m-20 items-center">
        <li className="sm:mr-10 font-bold text-lg mb-2 text-yellow-400 max-[600px]:text-sm">
          <Link to="/dashboard/admin/default">Dashboard</Link>
        </li>
        <li className="font-bold text-lg mb-2 text-yellow-400 max-[600px]:text-sm">
          <Link to="/dashboard/admin/employees">Employees</Link>
        </li>
      </ul>
    </div>
  );
}
