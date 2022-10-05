import React from 'react'
import './Todo.css'
const Todo = ({todo, completeTodo}) => {

  const handleClick = _ => {
    if(!todo.isDone){
     completeTodo(todo);
    }
  }
  return (
    <div className="card">
        <div className="card-header">
            <h3 className="card-title">{todo.title}</h3>
            <div className="extra-info">    
                <span className="badge date-badge">{todo.creationDate}</span>
                <button onClick={handleClick} className={todo.isDone?"button-badge complete":"button-badge incomplete"}>{todo.isDone?"Complete":"Incomplete"}</button>
            </div>
        </div>
        <div className="card-description">
            <p>{todo.description}</p>
        </div>
    </div>
  )
}

export default Todo
