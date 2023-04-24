import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  AddEmployeeAction,
  ClearAddEmployeeState,
  GetEmployeeAction,
} from "../../../../state/actions/employeeActions";
import { CircularProgress } from "@mui/material";

const employeeSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  age: Yup.number("age must be number")
    .min(18, "Too Short!")
    .max(65, "Too Long!")
    .required("Required"),
  gender: Yup.string("gender must be string").required("Required"),
  position: Yup.string("position must be string").required("Required"),
  type: Yup.string("type must be string").required("Required"),
  valid: Yup.date("valid must be date").min(
    new Date(),
    "Valid date must be greater than today"
  ),
  grossSallary: Yup.number("gross sallary must be number").required("Required"),
});

export default function AddEmployee({ open, handleOpen, type, employee }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.AddEmployeeReducer.loading);
  const message = useSelector((state) => state.AddEmployeeReducer.message);
  const error = useSelector((state) => state.AddEmployeeReducer.error_code);
  if (message) {
    setTimeout(() => {
      dispatch(GetEmployeeAction());
      dispatch(ClearAddEmployeeState());
      handleOpen();
    }, 3000);
  }
  if (error) {
    setTimeout(() => {
      dispatch(GetEmployeeAction());
      dispatch(ClearAddEmployeeState());
    }, 4000);
  }
  return (
    <Dialog open={open} onClose={handleOpen}>
      <div className="font-bold text-2xl text-yellow-500 ml-6 mt-8">
        Add Employee
      </div>
      <DialogContent>
        <DialogContentText>
          {message ? (
            <div className="p-2 text-black  bg-green-300 rounded-md">
              {message}
            </div>
          ) : null}
          {error ? (
            <div className="p-2 text-black  bg-red-300 rounded-md">{error}</div>
          ) : null}
        </DialogContentText>
        <Formik
          enableReinitialize
          Formik
          initialValues={{
            fullName: type === "edit" ? employee.fullName : "",
            email: type === "edit" ? employee.email : "",
            age: type === "edit" ? employee.age : "",
            gender: type === "edit" ? employee.gender : "male",
            position: type === "edit" ? employee.position : "",
            type: type === "edit" ? employee.type : "lease",
            valid: type === "edit" ? employee.valid : "",
            grossSallary: type === "edit" ? employee.grossSallary : "",
          }}
          validationSchema={employeeSchema}
          onSubmit={async (values, { setErrors }) => {
            if (values.type === "lease") {
              if (!values.valid) {
                setErrors({
                  valid: "validation date is required",
                });
              } else {
                await dispatch(AddEmployeeAction(values));
              }
            } else {
              await dispatch(AddEmployeeAction(values));
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
          }) => (
            <>
              <Form className="flex flex-col">
                <div className="flex flex-row">
                  <div className="w-1/2 bg-red h-full">
                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-yellow-500 dark:text-white"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="bg-gray-50 border border-gray-300 text-yellow-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="john.doe@company.com"
                        required
                      />
                    </div>
                    {errors.email && touched.email ? (
                      <div className="text-sm text-red-600">{errors.email}</div>
                    ) : null}

                    <div className="mb-6">
                      <label
                        htmlFor="fullName"
                        className="block mb-2 text-sm font-medium text-yellow-500 dark:text-white"
                      >
                        fullName
                      </label>
                      <input
                        type="fullName"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="bg-gray-50 border border-gray-300 text-yellow-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Meseret Kifle"
                        required
                      />
                    </div>
                    {errors.fullName && touched.fullName ? (
                      <div className="text-sm text-red-600">
                        {errors.fullName}
                      </div>
                    ) : null}
                    <label
                      htmlFor="age"
                      className="block mb-2 text-sm font-medium text-yellow-500 dark:text-white"
                    >
                      age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={values.age}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="bg-gray-50 border border-gray-300 text-yellow-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="25"
                      required
                    />
                    {errors.age && touched.age ? (
                      <div className="text-sm text-red-600">{errors.age}</div>
                    ) : null}
                    <div className="w-64 bg-white rounded-lg mt-6">
                      <h1 className="text-sm text-yellow-500 font-bold mb-4">
                        Select Gender
                      </h1>
                      <label className="flex items-center mb-4">
                        <input
                          type="radio"
                          value="male"
                          name="gender"
                          checked={values.gender === "male"}
                          onChange={handleChange}
                          className="form-radio text-blue-500 mr-2"
                        />
                        <span className="text-gray-700">Male</span>
                      </label>
                      <label className="flex items-center mb-4">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={values.gender === "female"}
                          onChange={handleChange}
                          className="form-radio text-pink-500 mr-2"
                        />
                        <span className="text-gray-700">Female</span>
                      </label>
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="mb-6">
                      <label
                        htmlFor="position"
                        className="block mb-2 text-sm font-medium text-yellow-500 dark:text-white"
                      >
                        Position
                      </label>
                      <input
                        type="position"
                        name="position"
                        value={values.position}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="bg-gray-50 border border-gray-300 text-yellow-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="full-stack developer"
                        required
                      />
                    </div>
                    {errors.position && touched.position ? (
                      <div className="text-sm text-red-600">
                        {errors.position}
                      </div>
                    ) : null}
                    <div className="mb-6">
                      <label
                        htmlFor="grossSallary"
                        className="block mb-2 text-sm font-medium text-yellow-500 dark:text-white"
                      >
                        Gross Sallary
                      </label>
                      <input
                        type="grossSallary"
                        name="grossSallary"
                        value={values.grossSallary}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="bg-gray-50 border border-gray-300 text-yellow-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="30000"
                        required
                      />
                    </div>
                    {errors.grossSallary && touched.grossSallary ? (
                      <div className="text-sm text-red-600">
                        {errors.grossSallary}
                      </div>
                    ) : null}
                    <div className="w-64 bg-white rounded-lg mt-6">
                      <h1 className="text-sm text-yellow-500 font-bold mb-4">
                        Type
                      </h1>
                      <label className="flex items-center mb-4">
                        <input
                          type="radio"
                          value="lease"
                          name="type"
                          checked={values.type === "lease"}
                          onChange={handleChange}
                          className="form-radio text-blue-500 mr-2"
                        />
                        <span className="text-gray-700">lease</span>
                      </label>
                      <label className="flex items-center mb-4">
                        <input
                          type="radio"
                          name="type"
                          value="permanent"
                          checked={values.type === "permanent"}
                          onChange={handleChange}
                          className="form-radio text-pink-500 mr-2"
                        />
                        <span className="text-gray-700">Permanent</span>
                      </label>
                    </div>
                    {values.type === "lease" ? (
                      <div className="w-full max-w-xs">
                        <label
                          className="block text-yellow-500 text-sm font-bold mb-2"
                          htmlFor="datepicker"
                        >
                          valid until
                        </label>
                        <input
                          id="datepicker"
                          type="date"
                          name="valid"
                          className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                          value={values.valid}
                          onChange={handleChange}
                        />
                      </div>
                    ) : null}
                    {errors.valid && touched.valid ? (
                      <div className="text-sm text-red-600">{errors.valid}</div>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-row justify-end mt-20">
                  <button
                    type="button"
                    className="text-white pl-10 pr-10 bg-red-400 mr-3 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleOpen}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="text-white pl-10 pr-10 bg-yellow-500 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleSubmit}
                  >
                    {loading ? (
                      <div>
                        <CircularProgress size={20} />
                        loading
                      </div>
                    ) : type === "edit" ? (
                      "Edit"
                    ) : (
                      "Add"
                    )}
                  </button>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
