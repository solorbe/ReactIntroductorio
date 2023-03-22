import React from 'react';
import { TodoCounter } from "./TodoCounter";
import { TodoSearch } from "./TodoSearch.js";
import { TodoList } from "./TodoList.js";
import { TodoItem } from "./TodoItem.js";
import { CreateTodoButton } from "./CreateTodoButton.js"

const todos = [
  { text: 'Cortar cebolla', completed: true},
  { text: 'Tomar el curso de intro a React', completed: false},
  { text: 'Llorar con la llorona', completed: false},
  { text: 'lalalalal', completed: false},
]

function App () {
  return (
  <React.Fragment>
   <TodoCounter />
   <TodoSearch /> 
   <TodoList>
   <TodoList>
        {todos.map((item, index)=>(
        <TodoItem key={index} {...item}/>
        ))}
   </TodoList>
   </TodoList> 
   <CreateTodoButton /> 
  </React.Fragment>
  );
}

export default App;