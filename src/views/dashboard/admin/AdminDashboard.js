import React from "react";
import SideBar from "./SideBar";
import DashboardMainArea from './sub components/DashboardMainArea'

export default function AdminDashboard() {
  
  return (
    <div className="w-full h-full flex flex-row">
      <SideBar/>
      <DashboardMainArea/>
    </div>
  );
}
