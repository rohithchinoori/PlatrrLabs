import {useState} from 'react'
import './index.css'
import {RiDeleteBin6Line} from 'react-icons/ri'

const TodoItem = props => {
  const {item, onDelete, todoList, setFilterTodo, setLocal} = props
  const [isChecked, setIsChecked] = useState(item.completed)

  const getDelete = () => {
    onDelete(item.id)

    setLocal(item.id)
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked) // Toggle the checkbox state
    const updatedTodoList = todoList.map(todo => {
      if (todo.id === item.id) {
        return {...todo, completed: !isChecked}
      }
      return todo
    })
    setFilterTodo(updatedTodoList)
  }
  const className = isChecked ? 'line' : ''

  return (
    <li className="li">
      <input
        type="checkbox"
        id={item.id}
        className="check"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div className="label">
        <label className={className} htmlFor={item.id}>
          {item.title}
        </label>
        <button className="del-but" type="button" onClick={getDelete}>
          {' '}
          <RiDeleteBin6Line />
        </button>
      </div>
    </li>
  )
}

export default TodoItem
