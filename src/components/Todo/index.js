import {useState, useEffect} from 'react'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {v4 as uuidv4} from 'uuid'
import TodoItem from '../TodoItem'

const Todo = () => {
  const [input, setInput] = useState('')
  const [todoList, setTodo] = useState([])
  const [filter, setFilter] = useState('All')
  const [error, showErr] = useState(false)

  useEffect(() => {
    const savedTodoList = localStorage.getItem('todoList')
    if (savedTodoList) {
      setTodo(JSON.parse(savedTodoList))
    }
  }, [])

  const getInput = event => {
    setInput(event.target.value)
  }

  const addTodo = () => {
    if (input.length !== 0) {
      const newItem = {
        id: uuidv4(),
        title: input,
        completed: false,
      }
      setTodo(prevState => [...prevState, newItem])
      setInput('')
      showErr(false)
    } else {
      showErr(true)
    }
  }

  const onDelete = id => {
    const delList = todoList.filter(item => item.id !== id)
    setTodo(delList)
  }

  const setFilterTodo = list => {
    setTodo(list)
  }

  const setLocal = id => {
    const updatedList = todoList.filter(item => item.id !== id)
    localStorage.setItem('todoList', JSON.stringify(updatedList))
  }

  const filteredTodoList = todoList.filter(item => {
    if (filter === 'All') {
      return true
    }
    if (filter === 'Completed') {
      return item.completed
    }
    if (filter === 'Incomplete') {
      return !item.completed
    }
    return true
  })
  console.log(filteredTodoList)

  return (
    <div className="todo-bg-container">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="todo-heading">Todos Application</h1>
            <h1 className="create-task-heading">
              Create <span className="create-task-heading-subpart">Task</span>
            </h1>
            <input
              type="text"
              id="todoUserInput"
              className="todo-user-input"
              placeholder="What needs to be done?"
              onChange={getInput}
              value={input}
            />
            {error && <p className="err">*Enter your Todo work.</p>}
            <div className="but-cont">
              <button
                className="button"
                id="addTodoButton"
                type="button"
                onClick={addTodo}
              >
                Add
              </button>
              <div>
                <p className="sort">Sort by</p>
                <select
                  className="drop"
                  onChange={event => setFilter(event.target.value)}
                  value={filter}
                >
                  <option value="All">All</option>
                  <option value="Completed">Completed</option>
                  <option value="Incomplete">Incomplete</option>
                </select>
              </div>
            </div>
            <h1 className="todo-items-heading">
              My <span className="todo-items-heading-subpart">Tasks</span>
            </h1>
            <ul className="todo-items-container">
              {filteredTodoList.map(eachItem => {
                if (filter === 'Completed' && !eachItem.completed) {
                  return null
                }
                return (
                  <TodoItem
                    key={eachItem.id}
                    item={eachItem}
                    onDelete={onDelete}
                    todoList={todoList}
                    setFilterTodo={setFilterTodo}
                    setLocal={setLocal}
                  />
                )
              })}
            </ul>

            <button
              className="button"
              id="saveTodoButton"
              type="button"
              onClick={setLocal}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todo
