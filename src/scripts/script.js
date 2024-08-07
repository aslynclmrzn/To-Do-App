import { useState, useEffect } from 'react';
import { format } from 'date-fns'; 

const useTodoList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState('');
  const [taskDate, setTaskDate] = useState(null);
  const [taskTime, setTaskTime] = useState(null);
  const [taskDescription, setTaskDescription] = useState(''); 
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('ALL');
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() && taskDate) {
      const [hours, minutes] = taskTime.split(':');
      const dateTime = new Date(taskDate);
      dateTime.setHours(hours, minutes);
      setTasks([
        ...tasks,
        {
          title: newTask,
          date: dateTime,
          description: taskDescription, 
          status: 'IN_PROGRESS',
          formattedDate: format(dateTime, 'MM/dd/yy h:mm a') 
        }
      ]);
      setNewTask('');
      setTaskDate(null);
      setTaskTime(null);
      setTaskDescription(''); 
    }
  };

  const handleUpdateTask = () => {
    if (editingTask !== null && newTask.trim() && taskDate) {
      const [hours, minutes] = taskTime.split(':');
      const dateTime = new Date(taskDate);
      dateTime.setHours(hours, minutes);
      const updatedTasks = tasks.map((task, index) =>
        index === editingTask
          ? {
              ...task,
              title: newTask,
              date: dateTime,
              description: taskDescription, 
              formattedDate: format(dateTime, 'MM/dd/yy h:mm a')
            }
          : task
      );
      setTasks(updatedTasks);
      setEditingTask(null);
      setNewTask('');
      setTaskDate(null);
      setTaskTime(null);
      setTaskDescription(''); 
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEditTask = (index) => {
    const task = tasks[index];
    setEditingTask(index);
    setNewTask(task.title);
    setTaskDate(new Date(task.date));
    setTaskTime(format(new Date(task.date), 'HH:mm'));
    setTaskDescription(task.description || ''); 
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleStatusChange = (index, status) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status: status } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteAllTasks = () => {
    setTasks([]);
    setShowDeleteAllModal(false);
  };

  const handleMarkAllDone = () => {
    const updatedTasks = tasks.map((task) => ({ ...task, status: 'COMPLETED' }));
    setTasks(updatedTasks);
  };

  const handleMarkAllUndone = () => {
    const updatedTasks = tasks.map((task) => ({ ...task, status: 'IN_PROGRESS' }));
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'ALL') return true;
    return task.status === filter;
  });

  return {
    tasks,
    newTask,
    taskDate,
    taskTime,
    taskDescription, 
    editingTask,
    filter,
    showDeleteAllModal,
    setNewTask,
    setTaskDate,
    setTaskTime,
    setTaskDescription,
    setEditingTask,
    setFilter,
    setShowDeleteAllModal,
    handleAddTask,
    handleDeleteTask,
    handleEditTask,
    handleUpdateTask,
    handleFilterChange,
    handleStatusChange,
    handleDeleteAllTasks,
    handleMarkAllDone,
    handleMarkAllUndone,
    filteredTasks,
  };
};

export default useTodoList;
