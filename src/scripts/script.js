import { useState, useEffect, useCallback, useMemo } from 'react';
import { format, setHours, setMinutes } from 'date-fns';

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

  const resetTaskInputs = useCallback(() => {
    setNewTask('');
    setTaskDate(null);
    setTaskTime('');
    setTaskDescription('');
    setEditingTask(null);
  }, []);


  const handleAddTask = useCallback(() => {
    if (!newTask.trim() || !taskDescription.trim() || !taskDate || !taskTime) {
      alert("All fields are required");
      return;
    }

    const [hours, minutes] = taskTime.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) {
      alert("Invalid time format");
      return;
    }

    const dateTime = setMinutes(setHours(new Date(taskDate), hours), minutes);

    const newTaskData = {
      title: newTask,
      date: dateTime,
      description: taskDescription,
      status: 'IN_PROGRESS',
      formattedDate: format(dateTime, 'MM/dd/yy h:mm a')
    };

    setTasks(prevTasks => [...prevTasks, newTaskData]);
    resetTaskInputs();
  }, [newTask, taskDate, taskTime, taskDescription, resetTaskInputs]);

  const handleUpdateTask = useCallback(() => {
    if (editingTask !== null) {
      if (!newTask.trim()) {
        alert("Task name is required.");
        return;
      }
  
      if (!taskDate) {
        alert("Task date is required.");
        return;
      }
  
      if (!taskTime) {
        alert("Task time is required.");
        return;
      }
  
      if (!taskDescription.trim()) {
        alert("Task description is required.");
        return;
      }
  
      const [hours, minutes] = taskTime.split(':').map(Number);
      const dateTime = setMinutes(setHours(new Date(taskDate), hours), minutes);
  
      const updatedTasks = tasks.map((task, index) =>
        index === editingTask
          ? { ...task, title: newTask, date: dateTime, description: taskDescription, formattedDate: format(dateTime, 'MM/dd/yy h:mm a') }
          : task
      );
  
      setTasks(updatedTasks);
      resetTaskInputs();
    }
  }, [editingTask, newTask, taskDate, taskTime, taskDescription, tasks, resetTaskInputs]);
  
  

  const handleDeleteTask = useCallback((index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  }, [tasks]);

  const handleEditTask = useCallback((index) => {
    const task = tasks[index];
    setEditingTask(index);
    setNewTask(task.title);
    setTaskDate(new Date(task.date));
    setTaskTime(format(new Date(task.date), 'HH:mm'));
    setTaskDescription(task.description || '');
  }, [tasks]);

  const handleFilterChange = useCallback((filter) => {
    setFilter(filter);
  }, []);

 const handleStatusChange = useCallback((index) => {
  setTasks((tasks) =>
    tasks.map((task, i) =>
      i === index
        ? { ...task, status: task.status === 'IN_PROGRESS' ? 'COMPLETED' : 'IN_PROGRESS' }
        : task
    )
  );
}, []);


  const handleDeleteAllTasks = useCallback(() => {
    setTasks([]);
    setShowDeleteAllModal(false);
  }, []);

  const handleMarkAllDone = useCallback(() => {
    setTasks(tasks => tasks.map(task => ({ ...task, status: 'COMPLETED' })));
  }, []);

  const handleMarkAllUndone = useCallback(() => {
    setTasks(tasks => tasks.map(task => ({ ...task, status: 'IN_PROGRESS' })));
  }, []);

  const filteredTasks = useMemo(() => {
    return filter === 'ALL' ? tasks : tasks.filter(task => task.status === filter);
  }, [tasks, filter]);

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