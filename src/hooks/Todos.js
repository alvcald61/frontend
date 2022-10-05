import {useEffect, useState} from 'react';

const useTodos = (user) => {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
      if(!user.username){
        return;
      }
      const getData = async ()=>{
          const promise = await fetch(`http://localhost:8080/api/v1/users/${user.username}/todos`);
          const response = await promise.json();
          if(promise.status === 200){
            setTodos(response);
          }        
      } 
      getData();
      
    }, [user.username]);
  
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
        await fetch(`http://localhost:8080/api/v1/users/completeTodo/${user.username}/${selectedTodo.id}`,{
          method: 'PUT',
        });
      }
      updateTodo();
    }
  return {todos, addTodo, completeTodo};
}


export default useTodos