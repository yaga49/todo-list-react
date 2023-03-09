import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

export type FilterValueType = "all" | "active" | "completed"

function App() {
    const [filter, setFilter] = useState<FilterValueType>("all")

    let todolistId1 = v1()
    let todolistId2 = v1()

    const [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
        ]
    })

    const [todoList, setTodoList] = useState([
        {id: todolistId1, title: "what to learn", filter: "all"},
        {id: todolistId2, title: "what to buy", filter: "all"}
    ])

    function removeTodoList(todoListId: string) {
        let filteredTodoList = todoList.filter(tl => todoListId !== tl.id)
        setTodoList(filteredTodoList)
        delete tasksObj[todoListId]
        setTasksObj({...tasksObj})
    }

    const removeTask = (id: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let filteredTask = tasks.filter(f => f.id !== id)
        tasksObj[todolistId] = filteredTask
        setTasksObj({...tasksObj})

    }

    function ChangeTodoListTitle(id: string, newTitle: string) {
        const todolist = todoList.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodoList([...todoList])
        }

    }

    function addTask(task: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let newTask = {id: v1(), title: task, isDone: false}
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasksObj({...tasksObj})
    }

    function changeFilter(value: FilterValueType, todoListId: string) {
        let todolist = todoList.find(tl => tl.id === todoListId)
        if (todolist) {
            todolist.filter = value
            setTodoList([...todoList])
        }

    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasksObj({...tasksObj})
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    const addTodoList = (title: string) => {
        let newTodoList: TodolistType =
            {
                id: v1(),
                title: title,
                filter: "all"
            }


        setTodoList([newTodoList, ...todoList])
        setTasksObj({
            ...tasksObj,
            [newTodoList.id]: []
        })
    }


    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={ {padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoList.map((tl) => {

                        let tasksTodoList = tasksObj[tl.id]
                        if (tl.filter === "active") {
                            tasksTodoList = tasksTodoList.filter(f => f.isDone === false)
                        }
                        if (tl.filter === "completed") {
                            tasksTodoList = tasksTodoList.filter(f => f.isDone === true)
                        }

                        return <Grid item>
                            <Paper style={ {padding: "20px"}}>
                                <TodoList
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    task={tasksTodoList}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodoList={removeTodoList}
                                    changeTaskTitle={changeTaskTitle}
                                    ChangeTodoListTitle={ChangeTodoListTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>

        </div>
    );
}

export default App;
