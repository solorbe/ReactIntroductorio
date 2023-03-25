import React from 'react';
import { TodoCounter } from "./TodoCounter";
import { TodoSearch } from "./TodoSearch.js";
import { TodoList } from "./TodoList.js";
import { TodoItem } from "./TodoItem.js";
import { CreateTodoButton } from "./CreateTodoButton.js"

const defaultTodos = [
  { text: 'Cortar cebolla', completed: true},
  { text: 'Tomar el curso de intro a React', completed: false},
  { text: 'Llorar con la llorona', completed: false},
  { text: 'lalalalal', completed: false},
]

function App () {
  const [todos, setTodos] = React.useState(defaultTodos); //lista las tareas
  const [searchValue, setSearchValue] = React.useState(''); //busca en el cuadro de texto

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
     } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }
  return (
  <React.Fragment>
   <TodoCounter 
    total={totalTodos}
    completed={completedTodos}
   />
   <TodoSearch 
    searchValue={searchValue}
    setSearchValue={setSearchValue}
    />
  {/* <TodoList>
        {todos.map((item, index)=>(
        <TodoItem key={index} {...item}/>
        ))}
   </TodoList> */}
 
   <TodoList>
        {searchedTodos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
          />
        ))}
    </TodoList>
  <CreateTodoButton /> 
  </React.Fragment>
  );
}

export default App;