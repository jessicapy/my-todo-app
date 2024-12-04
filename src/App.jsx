import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const sample_tasks = [
  {
    id: 1,
    text: "tarea 1",
    status: "todo",
    isCompleted: false
  },
  {
    id: 2,
    text: "tarea 2",
    status: "todo",
    isCompleted: false
  }
]
function App() {
  const [tasks, setTasks] = useState(sample_tasks);

  const manejarFormulario = (e) => {
    e.preventDefault(); //evitar el comportamiento nativo del formulario
    const inputValue = e.target[0].value; //value=nueva tarea
    e.target[0].value = ""; //limpia el input
    console.log(inputValue);

    const newTask = {
      id: Date.now(), //fecha y hora actual en milisegundos
      text: inputValue,
      status: "todo",
    }
    const tempNuevasTareas = [...tasks, newTask];//arreglo
    setTasks(tempNuevasTareas);//sobreescribe el arreglo anterior agregando la nueva tarea
  };

  const eliminarUltimo = () => {
    if (tasks.length > 0) {
      const updatedTasks = tasks.slice(0, tasks.length - 1);
      setTasks(updatedTasks);
    }
  };

  const handleRemoveTask = (id) => { const updatedTasks = tasks.filter(task => task.id !== id); setTasks(updatedTasks); };

  const toggleTaskCompletion = (id) => { const updatedTasks = tasks.map(task => { if (task.id === id) 
    { return { ...task, isCompleted: !task.isCompleted }; } return task; }); setTasks(updatedTasks); };

  return (
    <main>
      <h1>Todo App</h1>
      <form onSubmit={manejarFormulario}>
        <input type="text" />
        <button type="submit">Agregar</button>
      </form>
      <button onClick={eliminarUltimo}>Eliminar ultimo</button>
      <ul> {tasks.map(task => ( <li key={task.id} style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}> 
        <input type="checkbox" checked={task.isCompleted} onChange={() => toggleTaskCompletion(task.id)} /> 
        {task.text} <button onClick={() => handleRemoveTask(task.id)}>Remove</button> </li> ))} 
      </ul>

    </main>
  );
}

export default App
