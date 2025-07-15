import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [headings, setHeadings] = useState([]);
  const [headingInput, setHeadingInput] = useState('');
  const [listInputs, setListInputs] = useState({});
  const [todosByHeading, setTodosByHeading] = useState({});

  const handleAddHeading = () => {
    if (headingInput.trim() !== '') {
      setHeadings([...headings, headingInput]);
      setTodosByHeading({ ...todosByHeading, [headingInput]: [] });
      setHeadingInput('');
    }
  };

  const handleAddList = (heading) => {
    const listText = listInputs[heading];
    if (listText && listText.trim() !== '') {
      const updatedTodos = [...(todosByHeading[heading] || []), listText];
      setTodosByHeading({ ...todosByHeading, [heading]: updatedTodos });
      setListInputs({ ...listInputs, [heading]: '' });
    }
  };

  const handleDeleteTodo = (heading, index) => {
    const updatedTodos = [...todosByHeading[heading]];
    updatedTodos.splice(index, 1);
    setTodosByHeading({ ...todosByHeading, [heading]: updatedTodos });
  };

  const handleDeleteHeading = (heading) => {
    setHeadings(headings.filter((h) => h !== heading));
    const updatedTodos = { ...todosByHeading };
    delete updatedTodos[heading];
    setTodosByHeading(updatedTodos);
  };

  return (
    <div className="todo-container">
      <h1>My Todo List</h1>
      <input
        type="text"
        placeholder="Enter heading"
        value={headingInput}
        onChange={(e) => setHeadingInput(e.target.value)}
      />
      <button onClick={handleAddHeading}>Add Heading</button>

      <div className="todo-sections">
        {headings.map((heading, headingIndex) => (
          <div key={headingIndex} className="todo-box">
            <div className="heading-row">
              <h3>{heading}</h3>
              <button
                className="delete-button-heading"
                onClick={() => handleDeleteHeading(heading)}
              >
                Delete Heading
              </button>
            </div>

            <ul>
              {todosByHeading[heading]?.map((item, index) => (
                <li key={index}>
                  {item}{' '}
                  <button
                    onClick={() => handleDeleteTodo(heading, index)}
                    className="delete-todo"
                  >
                    
                  </button>
                </li>
              ))}
            </ul>

            <div className="input-container">
              <input
                type="text"
                placeholder="Add List"
                value={listInputs[heading] || ''}
                onChange={(e) =>
                  setListInputs({ ...listInputs, [heading]: e.target.value })
                }
              />
              <button onClick={() => handleAddList(heading)}>Add List</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
