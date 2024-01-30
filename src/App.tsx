import React, { useState } from "react";
import "./App.css";
import "./index.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //新しいTodoオブジェクトを作成
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };
    //Todoリストの配列に追加
    setTodos([newTodo, ...todos]);
    //投稿後はからにする
    setInputValue("");
  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        //id=今編集しているid, todo.id付き合わせをするID
        todo.inputValue = inputValue;
      }
      return todo;
    });
    //編集した内容を反映させたtodo配列を更新
    setTodos(newTodos);
  };

  const handleCheckd = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked=!checked
      }
      return todo
    })
    setTodos(newTodos)
  }
  
  const handleDelete = (id: number) => { 
    const newTodos = todos.filter((todo) => {
      return todo.id !== id
    } )
    setTodos(newTodos)
   }

  return (
    <div className='App'>
      <div className=' '>
        <h2 className='bg-green-200 text-xl'>Todoリスト with TypeScript</h2>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            className='border-2  '
            type='text'
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            type='submit'
            value='作成'
            className='border-2'
            onChange={() => {}}
          />
        </form>

        <ul>
          {todos.map((todos) => (
            <li key={todos.id}>
              <input
                className='border-2  '
                type='text'
                onChange={(e) => {
                  handleEdit(todos.id, e.target.value);
                }}
                value={todos.inputValue}
                disabled={todos.checked}
              />
              <input type='checkbox'onChange={(e) => {handleCheckd(todos.id, todos.checked);}}/>
              <button onClick={()=>handleDelete(todos.id)}>削除</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
