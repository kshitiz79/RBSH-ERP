import  { useState } from 'react'
import TaskForm from './TaskManagementComponent/TaskForm';
import TaskOverview from './TaskManagementComponent/TaskOverview';

const TaskManagement = () => {


  const [tasks, setTasks] = useState([]);



  const handleAddTask = (task) => {
    setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
  };
  return (
    <div>
            <TaskForm onAddTask={handleAddTask} />


            <TaskOverview tasks={tasks} setTasks={setTasks} />
    </div>
  )
}

export default TaskManagement