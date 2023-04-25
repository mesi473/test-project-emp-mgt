import React from "react";
import { useSelector, useDispatch } from "react-redux";
import LineGraph from "./LineGraph";
import { GetEmployeeAction } from "../../../../state/actions/employeeActions";
import SideBar from "../SideBar";

const DashboardMainArea = () => {
  const email = useSelector((state) => state.AccountReducer.email);
  const dispatch = useDispatch();
  const photoUrl = useSelector((state) => state.AccountReducer.photoUrl);
  const displayName = useSelector((state) => state.AccountReducer.displayName);
  const employees = useSelector((state) => state.GetEmployeeReducer.employees);
  React.useEffect(() => {
    dispatch(GetEmployeeAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const cardsData = [
    {
      title: "Total Employee",
      description: "all staff",
      color: "bg-yellow-500",
      data: employees.length,
    },
    {
      title: "Lease Employee",
      description: "contract staff for specific time",
      color: "bg-yellow-500",
      data: employees.filter((emp) => emp.type === "lease").length,
    },
    {
      title: "Permanent Employee",
      description: "permanent",
      color: "bg-yellow-500",
      data: employees.filter((emp) => emp.type === "permanent").length,
    },
  ];

  return (
    <div className="w-full h-full bg-slate-100 flex flex-col">
      <div className="flex flex-row justify-between w-full h-20 max-[600px]:h-40  shadow-md pb-8">
        <SideBar />
        <div className="flex flex-row text-center max-[600px]:flex-col  justify-center align-center mr-10 items-center mt-4">
          <div className="font-bold text-lg mr-4">
            <div className="text-yellow-400 max-[600px]:text-sm">{email}</div>
            <div className="text-yellow-400 max-[600px]:text-sm">{displayName}</div>
          </div>
          <div className="max-[600px]:w-10 max-[600px]:h-10 w-15 h-15 rounded-full border">
            <img
              className="max-[600px]:w-10 max-[600px]:h-10 w-15 h-15 rounded-full"
              src={photoUrl ? photoUrl : ""}
              alt="profile"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 w-full flex justify-center items-center">
        <div className="flex flex-wrap justify-between w-4/5 ">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4"
            >
              <div
                className={`border-2 border-gray-200 rounded-lg overflow-hidden shadow-md ${card.color}`}
              >
                <div className="flex items-center justify-center h-40 bg-white">
                  <div className="bg-yellow-500 rounded-full p-10 font-bold">
                    {card.data}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 h-1/3 w-full flex justify-center items-center">
        <div className="w-4/5 h-full mt-5 bg-white p-2">
          <LineGraph employees={employees} />
        </div>
      </div>
    </div>
  );
};

export default DashboardMainArea;
