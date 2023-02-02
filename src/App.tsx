import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TasksType = {
        id: string,
        title: string,
        isDone: boolean
}
type TodolistType ={
    id: string,
    title: string,
    filter: FilterValueType
}

export type FilterValueType = "all" | "active" | "completed"

function App() {
    const [filter, setFilter] = useState<FilterValueType>("all")

    let todolistId1 = v1()
    let todolistId2 = v1()

    const [tasksObj, setTasksObj] = useState({
        [todolistId1] : [
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
        ],
        [todolistId2] : [
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
        ]
    })

    const [todoList, setTodoList]  = useState([
        {id: todolistId1, title: "what to learn", filter: "active"},
        {id: todolistId2, title: "what to buy", filter: "completed"}
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
    function addTask(task: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let newTask = {id: v1(), title: task, isDone: false}
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasksObj({...tasksObj})
    }
    function changeFilter(value: FilterValueType, todoListId: string) {
        let todolist = todoList.find(tl=>tl.id === todoListId)
        if(todolist){
            todolist.filter = value
            setTodoList([...todoList])
        }

    }
    function changeStatus(taskId: string, isDone: boolean, todoListId: string){
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t=> t.id === taskId)
        if(task){
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }


    }






    return (
        <div className="App">
            {todoList.map((tl)=>{

                let tasksTodoList = tasksObj[tl.id]
                if(tl.filter === "active"){
                    tasksTodoList = tasksTodoList.filter(f=>f.isDone===false)
                }
                if(tl.filter === "completed"){
                    tasksTodoList = tasksTodoList.filter(f=>f.isDone===true)
                }

                return  <TodoList
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
                />
            })}


        </div>
    );
}

export default App;
