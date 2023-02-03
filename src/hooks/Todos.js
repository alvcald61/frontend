import {useEffect, useState} from 'react';

const useTodos = (user) => {
  
    const [todos, setTodos] = useState([]);
    useEffect(() => {
      if(!user.email){
        return;
      }
      const getData = async ()=>{
          const promise = await fetch(`http://localhost:8080/api/v1/users/${user.email}/todos`, 
          {
            headers: {
              'Content-Type': 'application/json',   
              "Authorization": `Bearer ${user.jwt}`
            }});
          const response = await promise.json();
          if(promise.status === 200){
            setTodos(response);
          }        
      } 
      getData();
      
    }, [user.email, user.jwt]);
  
    const addTodo = (todos) => { 
      setTodos(todos); 
    }
  
    const completeTodo = (selectedTodo)=>{
      const newTodos = todos.map((todo)=>{
        if(todo.id === selectedTodo.id){
          return {...todo, isDone: true};
        }
        return todo;
      });
      setTodos(newTodos);
      const updateTodo = async ()=>{
        await fetch(`http://localhost:8080/api/v1/users/completeTodo/${user.email}/${selectedTodo.id}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', 
            "Authorization": `Bearer ${user.jwt}`
          }
        });
      }
      updateTodo();
    }
  return {todos, addTodo, completeTodo};
}


export default useTodos