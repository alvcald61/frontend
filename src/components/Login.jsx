import React, { useEffect } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import "./Login.css";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";


const clientId =
  "462952765255-2eur4m8q4vv3420iva4qqu3f0sq2dmem.apps.googleusercontent.com";

const Login = ({ handleLogin, error, handleGoogleLogin }) => {
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  const handleSubmit = async (values) => {
    await handleLogin(values);
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const handleSuccess = async (response) => {
    await handleGoogleLogin(response);
  };

  const handleFailure = (response) => {

  };

  return (
    <div className="login-form">
      <h2 className="login-title"> Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Form className="form-layout">
          <label htmlFor="" className="login-label">
            Email:
          </label>
          <Field
            type="email"
            name="email"
            className="box-size"
            placeholder="email"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="login-error"
          />
          <label htmlFor="" className="login-label">
            Password:
          </label>
          <Field
            type="password"
            name="password"
            className="box-size"
            placeholder="Password"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="login-error"
          />
          {error && (
            <label style={{ color: "red" }}>
              {" "}
              Usuario o contraseña incorrecta
            </label>
          )}
          <button
            style={{ width: "100%", marginBottom: "20px" }}
            type="submit"
            className="submit-button"
          >
            Login
          </button>
          <GoogleLogin
            clientId={clientId}
            buttonText="Login with Google"
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            cookiePolicy="single_host_origin"
            // isSignedIn={true}
          />
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
