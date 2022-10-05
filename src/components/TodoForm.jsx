import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./TodoForm.css";

function TodoForm({todos, addTodo}) {
  const [message, setMessage] = useState(null);
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

  const handleSubmit = (values) => {
    const postData = async () => {
      const response = await fetch("http://localhost:8080/api/v1/users/addTodo/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), 
        });
        const data = await response.json();
        if(response.status===201){
          addTodo(data.todos);
          setMessage("Todo Added Successfully");
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