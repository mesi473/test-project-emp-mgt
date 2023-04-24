import React from "react";
import LoginImage from "../../static/images/towfiqu-barbhuiya-FnA5pAzqhMM-unsplash.jpg";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ClearLoginAction, LoginAction, LoginWithGoogleAction } from "../../state/actions/LoginAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Google } from "@mui/icons-material";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("password is Required"),
  email: Yup.string().email("Invalid email").required("email is Required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.AccountReducer.token);
  const loading = useSelector((state) => state.AccountReducer.loading);
  const error_code = useSelector((state) => state.AccountReducer.error_code);
  const navigate = useNavigate()
  if(error_code){
    setTimeout(() => {
      dispatch(ClearLoginAction())
    }, 3000);
  }
  return (
    <div className="flex justify-center items-center w-full h-full">
      {
        token ? navigate('/dashboard/admin/default') : null
      }
      <div className="w-2/3 h-3/4 bg-white shadow-md rounded-2xl flex flex-row">
        <div className=" w-1/2 rounded-tl-2xl rounded-bl-2xl mt-32">
          <div className="font-bold text-5xl text-yellow-500 flex justify-center align-center mt-8">
            Welcome
          </div>
          <div className="flex justify-center align-center mt-16">

            <div>
              <Formik
                enableReinitialize
                Formik
                initialValues={{
                  password: "",
                  email: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  // same shape as initial values
                  if (values.email && values.password) {
                    dispatch(LoginAction(values))
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
                  <Form>
                    {
                      error_code ?
                        <div
                          className="p-2 text-black  bg-red-300 rounded-md"
                        >{error_code}</div>
                        : null
                    }
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
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-yellow-500 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="bg-gray-50 border border-gray-300 text-yellow-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="•••••••••"
                        required
                      />
                    </div>
                    {errors.password && touched.password ? (
                      <div className="text-sm text-red-600">{errors.password}</div>
                    ) : null}
                    <button
                      type="submit"
                      onSubmit={handleSubmit}
                      disabled={loading}
                      className="text-white w-full bg-yellow-500 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      {loading?<div><CircularProgress size={20}/>loading...</div>:"Login"}
                    </button>
                    <button
                    className=" mt-3 flex items-center justify-center w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md focus:outline-none"
                    onClick={() => {
                      dispatch(LoginWithGoogleAction())
                    }}
                  >
                    <Google className="mr-2" /> Sign in with Google
                  </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        <div className="border-l w-1/2 rounded-tr-2xl rounded-br-2xl">
          <img
            className="w-full h-full rounded-tr-2xl rounded-br-2xl"
            src={LoginImage}
            alt="login"
          />
        </div>
      </div>
    </div>
  );
}
