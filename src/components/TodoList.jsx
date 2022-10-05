import React, {useState} from 'react'
import Todo from './Todo'
import './TodoList.css'

const TodoList = ({todos, completeTodo}) => {
    const [selected, setSelected] = useState("All")
    const handleClick = (e)=>{
        setSelected(e.target.innerHTML)
    }

  return (
    <div className="content">
        <h2 className="list-title">
            To-Do's
        </h2>
        <div className="filters">
            <button onClick={handleClick} className={selected === "All"?"active":"btn-grad"}>All</button>
            <button onClick={handleClick} className={selected === "Complete"?"active":"btn-grad"}>Complete</button>
            <button onClick={handleClick} className={selected === "Incomplete"?"active":"btn-grad"}>Incomplete</button>
        </div>

        <div className="lis-item">
            {
            todos && todos.filter(todo =>{
                if(selected === "Complete"){
                    return todo.isDone
                }
                if (selected === "Incomplete"){ 
                    return !todo.isDone
                }
                return true;

            })
            .map((todo)=> <Todo key={todo.id} todo={todo} completeTodo={completeTodo} />
            )
            }
        </div>
        
    </div>
  )
}

export default TodoList