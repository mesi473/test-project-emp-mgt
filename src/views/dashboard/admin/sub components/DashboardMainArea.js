import React from "react";
import { useSelector, useDispatch } from "react-redux";
import profilePic from "../../../../static/images/towfiqu-barbhuiya-FnA5pAzqhMM-unsplash.jpg";
import LineGraph from "./LineGraph";
import { GetEmployeeAction } from "../../../../state/actions/employeeActions";

const DashboardMainArea = () => {
  const email = useSelector((state) => state.AccountReducer.email);
  const dispatch = useDispatch();
  const photoUrl = useSelector((state) => state.AccountReducer.photoUrl);
  const displayName = useSelector((state) => state.AccountReducer.displayName);
  const cardsData = [
    {
      title: "Total Employee",
      description: "all staff",
      color: "bg-yellow-500",
    },
    {
      title: "Lease Employee",
      description: "contract staff for specific time",
      color: "bg-yellow-500",
    },
    {
      title: "Permanent Employee",
      description: "permanent",
      color: "bg-yellow-500",
    },
  ];
  const employees = useSelector((state) => state.GetEmployeeReducer.employees);
  React.useEffect(() => {
    dispatch(GetEmployeeAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col w-4/5 h-full justify-center items-center">
      <div className="flex justify-end w-full h-20">
        <div className="flex flex-row text-center justify-center align-center mr-10 items-center mt-4">
          <div className="font-bold text-lg mr-4">
            <div>{email}</div>
            <div>{displayName}</div>
          </div>
          <div className="w-20 h-20 rounded-full border">
            <img
              className="w-full h-full rounded-full"
              src={photoUrl?photoUrl:profilePic}
              alt="profile"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-5 w-4/5 ">
        {cardsData.map((card, index) => (
          <div key={index} className="w-1/4 p-4">
            <div
              className={` border-2 border-gray-200 rounded-lg overflow-hidden shadow-md ${card.color}`}
            >
              <div className="flex items-center justify-center h-40 bg-white">
                <div className="bg-yellow-500 rounded-full p-10 font-bold">
                  400
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
      <div className="w-4/5 h-2/4 mt-5 bg-white p-2">
        <LineGraph employees={employees} />
      </div>
    </div>
  );
};

export default DashboardMainArea;
