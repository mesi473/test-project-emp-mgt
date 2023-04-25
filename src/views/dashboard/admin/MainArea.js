import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddEmployee from "./sub components/AddEmployeesDialogBox";
import {
  ClearGetEmployeeState,
  GetEmployeeAction,
} from "../../../state/actions/employeeActions";
import { CircularProgress, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import DeleteEmployeeDialog from "./sub components/DeleteEmployeeModel";
import SideBar from "./SideBar";

const tableHead = [
  { name: "Full Name" },
  { name: "Email" },
  { name: "Age" },
  { name: "Gender" },
  { name: "Position" },
  { name: "Employement Type" },
  { name: "Valid Until" },
  { name: "Gross Sallary" },
];
export default function MainArea() {
  const email = useSelector((state) => state.AccountReducer.email);
  const photoUrl = useSelector((state) => state.AccountReducer.photoUrl);
  const displayName = useSelector((state) => state.AccountReducer.displayName);
  const employees = useSelector((state) => state.GetEmployeeReducer.employees);
  const loading = useSelector((state) => state.GetEmployeeReducer.loading);
  const get_employee_error = useSelector(
    (state) => state.GetEmployeeReducer.error_code
  );
  console.log(photoUrl);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(GetEmployeeAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (get_employee_error) {
    setTimeout(() => {
      dispatch(ClearGetEmployeeState());
    }, 3000);
  }
  const handleOpen = (ty) => {
    setOpen(!open);
    setType(ty);
  };
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteOpen = () => {
    setIsOpen(!isOpen);
  };
  const [type, setType] = React.useState("");
  const [employee, setEmployee] = React.useState({});
  return (
    <div className="w-full h-full bg-slate-100 flex flex-col">
      <AddEmployee
        open={open}
        handleOpen={handleOpen}
        type={type}
        employee={employee}
      />
      <DeleteEmployeeDialog
        isOpen={isOpen}
        handleOpen={handleDeleteOpen}
        employee={employee}
      />
      <div className="flex flex-row justify-between w-full h-20 shadow-md pb-8">
        <SideBar/>
        <div className="flex flex-row text-center justify-center align-center mr-10 items-center mt-4">
          <div className="font-bold text-lg mr-4">
            <div className="text-yellow-400">{email}</div>
            <div className="text-yellow-400">{displayName}</div>
          </div>
          <div className="w-15 h-15 rounded-full border">
            <img
              className="w-15 h-15 rounded-full"
              src={photoUrl ? photoUrl : ""}
              alt="profile"
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-5">
        <div className=" flex flex-col">
          <div>
            <button
              onClick={() => handleOpen("add")}
              className="bg-yellow-400 ml-20 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-md"
            >
              {type === "edit" ? "Edit" : "Add"} Employee
            </button>
          </div>
          <div className="flex flex-col lg:ml-20">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="">
                  {get_employee_error ? (
                    <div className="p-2 text-black bg-red-300 rounded-md">
                      {get_employee_error}
                    </div>
                  ) : null}
                  <div className="lg:w-full overflow-x-auto">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            #
                          </th>
                          {tableHead.map((th, i) => (
                            <th key={i} scope="col" className="px-6 py-4">
                              {th.name}
                            </th>
                          ))}
                          <th scope="col" className="px-6 py-4">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="overflow-auto max-h-96">
                        {!loading ? (
                          employees?.length > 0 ? (
                            employees.map((emp, i) => (
                              <tr
                                key={i}
                                className="border-b transition duration-300 ease-in-out hover:bg-yellow-400 dark:border-neutral-500 dark:hover:bg-neutral-600"
                              >
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {i + 1}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {emp.fullName}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {emp.email}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {emp.age}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {emp.gender}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {emp.position}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {emp.type}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {emp.valid}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {emp.grossSallary}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  <IconButton
                                    onClick={() => {
                                      handleOpen("edit");
                                      setEmployee(emp);
                                    }}
                                  >
                                    <Edit color="primary" />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => {
                                      handleDeleteOpen();
                                      setEmployee(emp);
                                    }}
                                  >
                                    <Delete color="error" />
                                  </IconButton>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                className="whitespace-nowrap px-6 py-4"
                                colSpan={tableHead.length + 2}
                              >
                                No Data
                              </td>
                            </tr>
                          )
                        ) : (
                          <tr>
                            <td
                              className="whitespace-nowrap px-6 py-4"
                              colSpan={tableHead.length + 2}
                            >
                              <CircularProgress />
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
