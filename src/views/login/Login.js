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
  const navigate = useNavigate();
  if (error_code) {
    setTimeout(() => {
      dispatch(ClearLoginAction());
    }, 3000);
  }
  return (
    <div className="flex justify-center items-center w-full h-full">
      {token ? navigate("/dashboard/admin/default") : null}
      <div className="w-full sm:w-2/3 h-3/4 bg-white shadow-md rounded-2xl flex flex-row">
        <div className="w-full sm:w-1/2 rounded-tl-2xl rounded-bl-2xl mt-32">
          <div className="font-bold text-5xl text-yellow-500 flex justify-center align-center mt-8">
            Welcome
          </div>
          <div className="flex justify-center align-center mt-16">
            <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/3">
              <Formik
                enableReinitialize
                initialValues={{
                  password: "",
                  email: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  // same shape as initial values
                  if (values.email && values.password) {
                    dispatch(LoginAction(values));
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
                    {error_code ? (
                      <div className="p-2 text-black bg-red-300 rounded-md">
                        {error_code}
                      </div>
                    ) : null}
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
                      <div className="text-sm                       text-red-600 mb-2">
                      {errors.email}
                    </div>
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
                      placeholder="********"
                      required
                    />
                  </div>
                  {errors.password && touched.password ? (
                    <div className="text-sm text-red-600 mb-2">
                      {errors.password}
                    </div>
                  ) : null}
                  <div className="flex justify-center mt-8">
                    <button
                      type="submit"
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress
                          size={20}
                          className="text-white"
                        />
                      ) : (
                        "Login"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="flex justify-center mt-4">
              <button
                className="text-yellow-500 font-semibold hover:underline"
                onClick={() => {
                  dispatch(LoginWithGoogleAction());
                }}
              >
                <Google className="mr-2" />
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="hidden sm:block w-1/2 bg-cover bg-center rounded-tr-2xl rounded-br-2xl"
        style={{ backgroundImage: `url(${LoginImage})` }}
      ></div>
    </div>
  </div>
);
}

