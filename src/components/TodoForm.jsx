import React, {useState, useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./TodoForm.css";

function TodoForm({todos, addTodo, isLogin}) {
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  //TODO: pass user from hook to this component 
  useEffect(() => {
    console.log("ejecuta")
    const localUser = window.sessionStorage.getItem('user');
    if(localUser){
      setUser(JSON.parse(localUser));
    }
  }, [isLogin])

  const validate = (values) => {
    const error = {};
    if (!values.title) {
      error.title = "Required";
    }

    if (!values.description) {
      error.description = "Required";
    }
    return error;
  };

  const handleSubmit = (values, {resetForm}) => {
    const postData = async () => {
      const response = await fetch(`http://localhost:8080/api/v1/users/addTodo/${user.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.jwt}`
        },
        body: JSON.stringify(values), 
        });
        const data = await response.json();
        if(response.status===201){
          addTodo(data.todos);
          setMessage("Todo Added Successfully");
          resetForm();
        }
        else{
          setMessage("Error Occurred");
        }  
        setTimeout  (() => {
          setMessage(null);
        }, 5000);
      }
    postData();
  }
  return (
    <div className="position">
      <Formik
        initialValues={{ title: "", description: "" }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Form className="form">
        <h1 className="title">
        To-Do List
      </h1>
      <h3>{`Welcome back ${user?.name || "" }`}</h3>
          <div className="align-content">
            <label className="form-label" htmlFor="title">
              Title:
            </label>
            <Field className="box-size" name="title" type="text" />
            <ErrorMessage name="title" />
            <label className="form-label" htmlFor="description">
              Description:
            </label>
            <Field className="box-size textarea-size" name="description" as="textarea" />
            <ErrorMessage name="description" />
          </div>
          <button className="submit-button"type="submit">Submit</button>
          {message  && <label>{message}</label>}
        </Form>
      </Formik>
    </div>
  );
}

export default TodoForm