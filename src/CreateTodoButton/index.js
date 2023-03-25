// import React from 'react';
// import './CreateTodoButton.css';

// function CreateTodoButton(props) {
//   return (
//     <button className="CreateTodoButton"/>
//   );
// }

// export { CreateTodoButton };

import React from 'react';
import './CreateTodoButton.css';

function CreateTodoButton(props) {
  const onClickButton = (msg) => {
    alert(msg);
  };
  
  return (
    <button
      className="CreateTodoButton"
      onClick={() => onClickButton('Aquí se debería abrir el modal')}
    >
      +
    </button>
  );
}

export { CreateTodoButton };