import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearDeleteEmployeeState,
  GetEmployeeAction,
  DeleteEmployeeAction
} from "../../../../state/actions/employeeActions";
import { CircularProgress } from "@mui/material";

const DeleteEmployeeDialog = ({ isOpen, handleOpen, employee }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(DeleteEmployeeAction(employee?.fullName));
  };

  const loading = useSelector((state) => state.DeleteEmployeeReducer.loading);
  const message = useSelector((state) => state.DeleteEmployeeReducer.message);
  const error = useSelector((state) => state.DeleteEmployeeReducer.error_code);
  if (error) {
    setTimeout(() => {
      dispatch(ClearDeleteEmployeeState());
    }, 3000);
  }
  if (message) {
    setTimeout(() => {
      dispatch(GetEmployeeAction());
      dispatch(ClearDeleteEmployeeState());
      handleOpen();
    }, 3000);
  }
  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed z-10 inset-0 bg-black bg-opacity-25 transition-opacity"
              onClick={handleOpen}
            ></div>
            <div className="bg-white z-20 rounded-md p-6 max-w-md w-full">
              <h2 className="text-2xl font-semibold mb-4">Confirm Deletion</h2>
              {message ? (
                <div className="p-2 text-black  bg-green-300 rounded-md">
                  {message}
                </div>
              ) : null}
              {error ? (
                <div className="p-2 text-black  bg-red-300 rounded-md">
                  {error}
                </div>
              ) : null}
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete this employee?
              </p>
              <div className="flex justify-end">
                <button
                  disabled={loading || message}
                  className="mr-2 px-4 py-2 text-white bg-red-500 rounded"
                  onClick={handleDelete}
                >
                  {loading ? (
                    <div>
                      <CircularProgress size={12}/>
                      loading...
                    </div>
                  ) : (
                    "Delete"
                  )}
                </button>
                <button
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded"
                  onClick={handleOpen}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteEmployeeDialog;
