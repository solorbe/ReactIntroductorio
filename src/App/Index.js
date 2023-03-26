import React from 'react';
import { AppUI } from './AppUI';

// const defaultTodos = [
//   { text: 'Cortar cebolla', completed: true },
//   { text: 'Tomar el cursso de intro a React', completed: false },
//   { text: 'Llorar con la llorona', completed: true },
//   { text: 'LALALALAA', completed: false },
// ];
// function useLocalStorage(itemName, initialValue) {
//   const localStorageItem = localStorage.getItem(itemName);
//   let parsedItem;
  
//   if (!localStorageItem) {
//     localStorage.setItem(itemName, JSON.stringify(initialValue));
//     parsedItem = initialValue;
//   } else {
//     parsedItem = JSON.parse(localStorageItem);
//   }

//   const [item, setItem] = React.useState(parsedItem);

//   const saveItem = (newItem) => {
//     const stringifiedItem = JSON.stringify(newItem);
//     localStorage.setItem(itemName, stringifiedItem);
//     setItem(newItem);
//   };

//   return [
//     item,
//     saveItem,
//   ];
// }

function useLocalStorage(itemName, initialValue) 
{
  // Creamos el estado inicial para nuestros errores y carga
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [item, setItem] = React.useState(initialValue);
  
  React.useEffect(() => {
  // Simulamos un segundo de delay de carga 
    setTimeout(() => {
      // Manejamos la tarea dentro de un try/catch por si ocurre algún error
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;
        
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }
        setItem(parsedItem);
      } catch(error) {
      // En caso de un error lo guardamos en el estado
        setError(error);
      } finally {
        // También podemos utilizar la última parte del try/cath (finally) para terminar la carga
        setLoading(false);
      }
    }, 5000);
  });
  const saveItem = (newItem) => {
    // Manejamos la tarea dentro de un try/catch por si ocurre algún error
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      setItem(newItem);
    } catch(error) {
      // En caso de algún error lo guardamos en el estado
      setError(error);
    }
  };
  // Para tener un mejor control de los datos retornados, podemos regresarlos dentro de un objeto
  return {
    item,
    saveItem,
    loading,
    error,
  };
}



function App() {
    // Desestructuramos los nuevos datos de nustro custom hook
    const {
      item: todos,
      saveItem: saveTodos,
      loading,
      error,
    } = useLocalStorage('TODOS_V1', []);
  
  //const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = React.useState('');

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

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };
  
//   return (
//     <AppUI
//       totalTodos={totalTodos}
//       completedTodos={completedTodos}
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       searchedTodos={searchedTodos}
//       completeTodo={completeTodo}
//       deleteTodo={deleteTodo}
//     />
//   );
// }

// export default App;

 return(<AppUI
  loading={loading}
  error={error}
  totalTodos={totalTodos}
  completedTodos={completedTodos}
  searchValue={searchValue}
  setSearchValue={setSearchValue}
  searchedTodos={searchedTodos}
  completeTodo={completeTodo}
  deleteTodo={deleteTodo}/>);

 }
export default App;
 


















// import React from 'react';
// import { TodoCounter } from '../TodoCounter';
// import { TodoSearch } from '../TodoSearch';
// import { TodoList } from '../TodoList';
// import { TodoItem } from '../TodoItem';
// import { CreateTodoButton } from '../CreateTodoButton';
// // import './App.css';

// const defaultTodos = [
//   { text: 'Cortar cebolla', completed: true },
//   { text: 'Tomar el cursso de intro a React', completed: false },
//   { text: 'Llorar con la llorona', completed: false },
//   { text: 'LALALALAA', completed: false },
// ];

// function App() {
//   const [todos, setTodos] = React.useState(defaultTodos);
//   const [searchValue, setSearchValue] = React.useState('');

//   const completedTodos = todos.filter(todo => !!todo.completed).length;
//   const totalTodos = todos.length;

//   let searchedTodos = [];

//   if (!searchValue.length >= 1) {
//     searchedTodos = todos;
//   } else {
//     searchedTodos = todos.filter(todo => {
//       const todoText = todo.text.toLowerCase();
//       const searchText = searchValue.toLowerCase();
//       return todoText.includes(searchText);
//     });
//   }
  
//   const completeTodo = (text) => {
//     const todoIndex = todos.findIndex(todo => todo.text === text);
//     const newTodos = [...todos];
//     newTodos[todoIndex].completed = true;
//     setTodos(newTodos);
//   };
//   const deleteTodo = (text) => {
//     const todoIndex = todos.findIndex(todo => todo.text === text);
//     const newTodos = [...todos];
//     newTodos.splice(todoIndex, 1);
//     setTodos(newTodos);
//   };
//   return (
//     <React.Fragment>
//       <TodoCounter
//         total={totalTodos}
//         completed={completedTodos}
//       />
//       <TodoSearch
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//       />

//       <TodoList>
//         {searchedTodos.map(todos => (
//           <TodoItem
//             key={todos.text}
//             text={todos.text}
//             completed={todos.completed}
//             oncomplete={()=> completeTodo(todos.text)}     
//             ondelete={()=>deleteTodo(todos.text)}     />
//         ))}
//       </TodoList>

//       <CreateTodoButton />
//     </React.Fragment>
//   );
// }

// export default App;