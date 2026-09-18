import './App.scss';
import TodoList from './Compoments/TodosList';
import TodoForm from './Compoments/TodoForm';
import PostList from './Compoments/PostList';
import { useEffect, useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love Easy Frontend! 😍 ' },
    { id: 2, title: 'We love Easy Frontend! 🥰 ' },
    { id: 3, title: 'They love Easy Frontend! 🚀 ' },
  ]);

  const [postList, setPostList] = useState([]);
  useEffect(() => {
    async function fetchPostList() {
      //...

      try {
        const requestUrl = 'https://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';
      const response = await fetch(requestUrl);
      const responseJSON = await response.json();
      console.log({ responseJSON });

      const{data} = responseJSON;
      setPostList(data);
      } catch (error) {
        console.log("Failed to fetch post list: ", error.message);
      }  
    }

    fetchPostList();
  }, []);

  

  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if(index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    console.log('From submit: ', formValues);
    //add new todo to current todo list
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    }
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  return (
    <div className="app">
      <h1>React Hook - PostList</h1>


      {/* <TodoForm onSubmit = {handleTodoFormSubmit}/>
      <TodoList todos = {todoList} onTodoClick={handleTodoClick}/> */}

      <PostList posts={postList} />
    </div>
  );
}



export default App;
