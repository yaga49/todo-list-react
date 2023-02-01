import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TasksType = {
        id: string,
        title: string,
        isDone: boolean
}

export type FilterValueType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: "CSS", isDone: false},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "REACT", isDone: false},
    ])

    const [filtered, setFiltered] = useState<FilterValueType>("all")

    const removeTask = (id: string) => {
        setTasks(tasks.filter( (f)=>{
            return f.id !== id
        }))

    }
    function addTask(task: string) {
        let newTask = {id: v1(), title: task, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }
    function changeFilter(value: FilterValueType) {
        setFiltered(value)
    }
    function changeStatus(taskId: string, isDone: boolean){
        let task = tasks.find(t=> t.id === taskId)
        if(task){
            task.isDone = isDone
        }

        setTasks([...tasks])
    }

    let tasksTodoList = tasks
    if(filtered === "active"){
        tasksTodoList = tasks.filter(f=>f.isDone===true)
    }
    if(filtered === "completed"){
        tasksTodoList = tasks.filter(f=>f.isDone===false)
    }




    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                task={tasksTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filtered}
                />

        </div>
    );
}

export default App;
