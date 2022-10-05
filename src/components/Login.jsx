import React from 'react'
import {Formik, Form, ErrorMessage, Field} from 'formik'
import './Login.css'

const Login = ({handleLogin}) => {
  const validate = (values)=>{
    const errors = {};
    if(!values.username){
      errors.username = 'Required'
    }
    if(!values.password){
      errors.password = 'Required'
    }
    return errors
  }

  const handleSubmit = async (values)=>{
    await handleLogin(values)
  }

  return (
    <div className="login-form">
        <h2 className="login-title"> Login</h2>
        <Formik
            initialValues={{username: '', password: ''}}
            validate={validate}
            onSubmit={handleSubmit}
        >
            <Form className="form-layout">
              <label htmlFor="" className="login-label">
                Username:
              </label>
              <Field type="username" name="username" className="box-size" placeholder="Username"/>
              <ErrorMessage name="username" component="div" className="login-error"/>
              <label htmlFor="" className="login-label">    
                Password:              
              </label>
              <Field type="password" name="password" className="box-size" placeholder="Password"/>
              <ErrorMessage name="password" component="div" className="login-error"/>
              <button  style={{width:"100%"}} type="submit" className="submit-button">Login</button>
            </Form>
        </Formik>
    </div>
  )
}

export default Login