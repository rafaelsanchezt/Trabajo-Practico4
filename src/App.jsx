import { useState} from 'react'

const App = () => {

  const [todoArray, setTodoArray] = useState ([
    {
      titulo: "Titulo1",
      descripcion: "Descripcion1",
      isComplete: false,
      id: 1
    },
    {
      titulo: "Titulo2",
      descripcion: "Descripcion2",
      isComplete: true,
      id: 2
    }
  ])

  const completeCount = todoArray.filter(todo => todo.isComplete == true).length

  const pendingCount = todoArray.length - completeCount 

  const [formData, setFormData] = useState ({titulo: '', descripcion: ''})

  const [todoEditId, setTodoEditId] = useState (null)

  const handleChange = ({target}) => {

    setFormData({...formData, [target.name]: target.value })

  }

  const addTodo = (e) => {

    e.preventDefault();

    if (todoEditId !== null) {

      const newTodo =  [...todoArray]
    let todo = newTodo.find((todo) => todo.id == todoEditId)
    todo.titulo = formData.titulo
    todo.descripcion = formData.descripcion
    setTodoArray(newTodo)
    setTodoEditId(null)
    setFormData({titulo: '', descripcion: ''})
      
    } else {

      if (formData.titulo !== '' && formData.descripcion !== '') {

        const todo = formData
  
        todo.isComplete = false
  
        todo.id = Date.now()
  
        setTodoArray([...todoArray, todo])
   
        setFormData({titulo: '', descripcion: ''})
  
  
      }
  
    }

   
  }

  const deleteTodo = (id) => {

    const newTodos = todoArray.filter(todo => todo.id !== id)

    setTodoArray(newTodos)

  }
  
  const toggleTodo = (id) => {

    const newTodo =  [...todoArray]
    let todo = newTodo.find((todo) => todo.id == id)
    todo.isComplete = !todo.isComplete
    setTodoArray(newTodo)
  }

  const deletaAllComplete = () => {

    const newTodo = todoArray.filter(todo => todo.isComplete == false)
    setTodoArray(newTodo)

  }

  const setTodoEdit = (id) => {

    const todo = todoArray.find ((todo) => todo.id == id)
    setFormData({titulo: todo.titulo, descripcion: todo.descripcion})
    setTodoEditId(id)
  }

  return (
    <>
    <div className='container w-75'>

      <form className='input-group shadow rounded p-3' onSubmit={addTodo}>

        <input className='form-control' type="text" name= "titulo" placeholder='Titulo' value={formData.titulo} onChange={handleChange}/>

        <input className='form-control' type="text" name="descripcion" placeholder='Descripcion' value={formData.descripcion} onChange={handleChange}/>

        <input className='btn btn-primary' type="submit" value='agregar tarea' />
      </form>

      <div className='shadow rounded p-4 mt-5 w-100'>

        <div className='d-flex align-items-center justify-content-between list-group-item p-3'>

          <h5>Lista de Tareas</h5>

          <button className='btn btn-danger' onClick={deletaAllComplete}>Eliminar tareas completadas</button>

        </div>

        {

          todoArray.map((todo) =>

            <div key={todo.id} className='d-flex align-items-center list-group-item'>

              <input type="checkbox" className='form-check-input mx-2' checked={todo.isComplete} onChange={() => toggleTodo(todo.id)}/>

              <p className={`p-0 m-0 flex-grow-1 ${todo.isComplete ? 'text-decoration-line-through' : ''}`}>

                {todo.titulo}<br/>

                <span className='text-muted'>{todo.descripcion}</span>

              </p>

              {todo.isComplete && <span className='badge bg-success'>Completada</span>}

              <button className='btn btn-warning mx-1' onClick={() => setTodoEdit(todo.id)}>✍️</button>
              
              <button className='btn btn-danger mx-1' onClick={() => deleteTodo(todo.id)}>🗑️</button>

            </div>
          )

        }

        <div className='list-group-item p-3'>

          <span className='fw-light font-monospace'> Total de tareas: {todoArray.length} , Completadas:{completeCount} , Pendientes: {pendingCount} </span>

        </div>

      </div>

    </div>
      
    </>
  )
}

export default App


