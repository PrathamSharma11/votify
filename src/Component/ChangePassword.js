import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { handleError, handleSuccess } from "../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const initialValues = {
  password: "",
  password_confirmation: "",
};

const validationSchema = Yup.object({
  password: Yup.string().required("Password is required"),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ).required("Password confirmation is required"),
});


const handleSubmit = async(values, { resetForm }) => {
//   console.log("Form Submitted:", values);
  try{
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_BASE_URL}/user/changeuserpassword`,
        {
             password:values.password,
             password_confirmation:values.password_confirmation,
        },
        {
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type":"application/json",
            },
        }
    );
    const {message} = response.data;
    // console.log(message);
    if(response.status === 200){
        handleSuccess(message);
        resetForm();
    
    }else{
        handleError(message);
    }

  }catch(error){
        console.error("an error occured ",error); 
  }
};

function ChangePassword() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Change Password
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700">Password:</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">
                  Confirm Password:
                </label>
                <Field
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm Password"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage
                  name="password_confirmation"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ChangePassword;
