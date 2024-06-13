import React, { useState, useEffect } from 'react';

const App = () => {
  const [todoArray, setTodoArray] = useState([]);
  const [formData, setFormData] = useState({titulo: '', descripcion: ''});
  const [todoEditId, setTodoEditId] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        setTodoArray(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChange = ({target}) => {
    setFormData({...formData, [target.name]: target.value});
  }

  const addTodo = (e) => {
    e.preventDefault();

    if (todoEditId !== null) {
      const newTodoArray = [...todoArray];
      const todoIndex = newTodoArray.findIndex(todo => todo.id === todoEditId);
      if (todoIndex !== -1) {
        newTodoArray[todoIndex] = {
          ...newTodoArray[todoIndex],
          titulo: formData.titulo,
          descripcion: formData.descripcion
        };
        setTodoArray(newTodoArray);
        setTodoEditId(null);
        setFormData({titulo: '', descripcion: ''});
      }
    } else {
      if (formData.titulo !== '' && formData.descripcion !== '') {
        const newTodo = {
          titulo: formData.titulo,
          descripcion: formData.descripcion,
          isComplete: false,
          id: Date.now()
        };
        setTodoArray([...todoArray, newTodo]);
        setFormData({titulo: '', descripcion: ''});
      }
    }
  }

  const deleteTodo = (id) => {
    const newTodos = todoArray.filter(todo => todo.id !== id);
    setTodoArray(newTodos);
  }

  const toggleTodo = (id) => {
    const newTodoArray = [...todoArray];
    const todoIndex = newTodoArray.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      newTodoArray[todoIndex] = {...newTodoArray[todoIndex], isComplete: !newTodoArray[todoIndex].isComplete};
      setTodoArray(newTodoArray);
    }
  }

  const deleteAllComplete = () => {
    const newTodoArray = todoArray.filter(todo => !todo.isComplete);
    setTodoArray(newTodoArray);
  }

  const setTodoEdit = (id) => {
    const todoToEdit = todoArray.find(todo => todo.id === id);
    if (todoToEdit) {
      setFormData({titulo: todoToEdit.titulo, descripcion: todoToEdit.descripcion});
      setTodoEditId(id);
    }
  }

  const completeCount = todoArray.filter(todo => todo.isComplete).length;
  const pendingCount = todoArray.length - completeCount;

  return (
    <>
      <div className='container w-75'>
        <form className='input-group shadow rounded p-3' onSubmit={addTodo}>
          <input className='form-control' type="text" name="titulo" placeholder='Titulo' value={formData.titulo} onChange={handleChange}/>
          <input className='form-control' type="text" name="descripcion" placeholder='Descripcion' value={formData.descripcion} onChange={handleChange}/>
          <input className='btn btn-primary' type="submit" value='agregar tarea'/>
        </form>

        <div className='shadow rounded p-4 mt-5 w-100'>
          <div className='d-flex align-items-center justify-content-between list-group-item p-3'>
            <h5>Lista de Tareas</h5>
            <button className='btn btn-danger' onClick={deleteAllComplete}>Eliminar tareas completadas</button>
          </div>

          {todoArray.map(todo => (
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
          ))}

          <div className='list-group-item p-3'>
            <span className='fw-light font-monospace'> Total de tareas: {todoArray.length} , Completadas: {completeCount} , Pendientes: {pendingCount} </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;


