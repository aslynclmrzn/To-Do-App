import { useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DoneAll as DoneAllIcon, Undo as UndoIcon } from '@mui/icons-material';
import useTodoList from '../scripts/script';
import styles from '../styles/style.module.scss';
import logo from '../assets/logo.png';


const TodoList = () => {
  const {
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
  } = useTodoList();

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleDeleteAll = () => {
    handleDeleteAllTasks();
    setOpenSnackbar(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <header className={styles.header}>
      <img src={logo} alt="Logo" className={styles.logo} />
      </header>
      <Container>
        <Grid container spacing={0} justifyContent="center">
          <Grid item md={5} marginTop='10px'>
            <Box display="flex" flexDirection="column" alignItems="center" className={styles.containerLeft}>
              <Typography className={styles.h4} variant="h4">TO-DO LIST</Typography>
              <TextField
                label="Task Name"
                fullWidth
                className={`${styles.textField} mb-2`}
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => {
                  if (editingTask !== null && e.key === 'Enter') {
                    handleUpdateTask();
                  } else if (e.key === 'Enter') {
                    handleAddTask();
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#601C87', 
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#601C87',
                  },
                }}
              />
              <TextField
                label="Task Description"
                multiline
                rows={4}
                fullWidth
                className={`${styles.textField} mt-2`}
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#601C87', 
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#601C87', 
                  },
                }}
              />
              <DatePicker
                label="Select Date"
                value={taskDate}
                onChange={(date) => setTaskDate(date)}
                inputFormat="MM/dd/yyyy"
                renderInput={(params) => <TextField {...params} />}
                className={`${styles.datePicker} mt-2`}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#601C87',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#601C87',
                  },
                }}
              />
              <TextField
                fullWidth
                type="time"
                color="warning"
                value={taskTime}
                onChange={(e) => setTaskTime(e.target.value)}
                className={`${styles.textField} mt-2`}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#601C87',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#601C87',
                  },
                }}
              ></TextField>

              <Box className={styles.addTaskContainer} mt={2}>
                <Button
                  variant="contained"
                  className={styles.addTaskButton}
                  onClick={editingTask !== null ? handleUpdateTask : handleAddTask}
                  sx={{
                    backgroundColor: '#601C87', 
                    color: 'white',             
                    '&:hover': {
                      backgroundColor: '#4b146b', 
                    },
                  }}
                >
                  {editingTask !== null ? 'Update Task' : 'Add Task'}
                </Button>
              </Box>
            </Box>
          </Grid>

         
          <Grid item md={7} className="p-3">
            <Grid container>
              <Box display="flex" justifyContent="center" className={styles.filterContainer}>
                <Box sx={{ m: 1 }}>
                  <Button
                    variant={filter === 'ALL' ? 'contained' : 'outlined'}
                    color="warning"
                    className={styles.filterButton}
                    onClick={() => handleFilterChange('ALL')}
                  >
                    ALL TASKS
                  </Button>
                </Box>
                <Box sx={{ m: 1 }}>
                  <Button
                    variant={filter === 'IN_PROGRESS' ? 'contained' : 'outlined'}
                    color="warning"
                    className={styles.filterButton}
                    onClick={() => handleFilterChange('IN_PROGRESS')}
                  >
                    IN PROGRESS
                  </Button>
                </Box>
                <Box sx={{ m: 1 }}>
                  <Button
                    variant={filter === 'COMPLETED' ? 'contained' : 'outlined'}
                    color="warning"
                    className={styles.filterButton}
                    onClick={() => handleFilterChange('COMPLETED')}
                  >
                    COMPLETED
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Box sx={{ m: 1 }}>
                  <Button
                    variant="contained"
                    onClick={() => setShowDeleteAllModal(true)}
                    disabled={tasks.length === 0}
                    startIcon={<DeleteIcon />}
                    sx={{
                      backgroundColor: '#601C87', 
                      color: 'white',            
                      '&:hover': {
                        backgroundColor: '#4b146b', 
                      },
                    }}
                  >
                    Delete All
                  </Button>
                </Box>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={handleMarkAllDone}
                  startIcon={<DoneAllIcon />}
                  sx={{
                    backgroundColor: '#601C87', 
                    color: 'white',             
                    '&:hover': {
                      backgroundColor: '#4b146b', 
                    },
                  }}
                >
                  Mark All Done
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={handleMarkAllUndone}
                  startIcon={<UndoIcon />}
                  sx={{
                    backgroundColor: '#601C87', 
                    color: 'white',             
                    '&:hover': {
                      backgroundColor: '#4b146b', 
                    },
                  }}
                >
                  Mark All Undone
                </Button>
              </Grid>
            </Grid>

            <List className={styles.scrollableContainer} style={{ width: '100%', paddingRight: '10px' }}>
              {filteredTasks.map((task, index) => (
                <ListItem key={index} className={styles.formControl}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={task.status === 'COMPLETED'}
                        onChange={() => handleStatusChange(index, task.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED')}
                        sx={{
                          color: 'purple',
                          '&.Mui-checked': {
                            color: 'purple',
                          },
                        }}
                      />
                    }
                    label={
                      <div style={{ color: '#EB4E31', marginLeft: '15px', display: 'flex', flexDirection: 'column', width: '100%', textAlign: 'left' }}>
                        <span style={{ marginRight: '90px', textDecoration: task.status === 'COMPLETED' ? 'line-through' : 'none' }}>
                          {task.title && (
                          <Typography style={{ fontWeight: '880', }}>
                            {task.title}
                          </Typography>
                        )}
                          {task.description && (
                          <Typography variant="body2" style={{ color: '#A1335F' }}>
                            {task.description}
                          </Typography>
                        )}
                        </span>
                        <span style={{ fontSize: '13px', color: '#601C87', whiteSpace: 'nowrap' }}>
                          Due at {new Date(task.date).toLocaleDateString()} {new Date(task.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    }
                    className="mx-2"
                  />
                  <ListItemSecondaryAction className={styles.listContainer}>
                    <IconButton onClick={() => handleEditTask(index)} className={styles.iconButton}>
                      <EditIcon />
                    </IconButton>
                    <IconButton style={{ margin: '10px'}} onClick={() => handleDeleteTask(index)} className={styles.iconButton}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <Dialog open={showDeleteAllModal} onClose={() => setShowDeleteAllModal(false)}>
          <DialogTitle>Delete All Tasks</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete all tasks? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDeleteAllModal(false)} color="warning">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleDeleteAll();
                setShowDeleteAllModal(false);
              }}
              color="secondary"
            >
              Delete All
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity="success">
            All tasks have been deleted successfully!
          </Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
};

export default TodoList;
