import React, {ChangeEvent, KeyboardEventHandler, useState, KeyboardEvent} from "react";
import {FilterValueType, TasksType} from "./App";

type TodoListNameType = {
    title: string
    task: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (task: string) => void
}


export function TodoList(props: TodoListNameType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.charCode === 13){
            props.addTask(newTaskTitle);
            setNewTaskTitle("")
        }
    }
    const onClickAddNewTaskHandler = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle("")
    }
    const onAllClickHandler = () =>  props.changeFilter("all")
    const onActiveClickHandler = () =>  props.changeFilter("active")
    const onCompletedClickHandler = () =>  props.changeFilter("completed")
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={newTaskTitle} onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    />
                    <button onClick={onClickAddNewTaskHandler}>+
                    </button>
                </div>
                <ul>
                    {props.task.map((e) => {
                        return (
                            <li key={e.id}>
                                <input type="checkbox" checked={e.isDone}/>
                                <span>{e.title}</span>
                                <button onClick={() => props.removeTask(e.id)}>x</button>
                            </li>
                        )
                    })}

                </ul>
                <div>
                    <button onClick={onAllClickHandler}>All
                    </button>
                    <button onClick={onActiveClickHandler}>Active
                    </button>
                    <button onClick={onCompletedClickHandler}>Completed
                    </button>
                </div>
            </div>
        </div>

    )
}