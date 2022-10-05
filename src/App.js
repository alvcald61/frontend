import React from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import useTodos from "./hooks/Todos";
import LoginModal from "./components/LoginModal";
import Login from "./components/Login";
import useLogin from "./hooks/Login";
import './App.css';

function App() {
  const { isLogin, user, handleLogin } = useLogin();
  const {todos, addTodo, completeTodo} = useTodos(user);
  return (
    <>
      {!isLogin && <LoginModal >
          <Login handleLogin={handleLogin}/>
      </LoginModal>}
      <TodoForm todos = {todos} addTodo={addTodo}/>
      <TodoList todos = {todos} completeTodo={completeTodo}/>
    </>
  );
}

export default App;
