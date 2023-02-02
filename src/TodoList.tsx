import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType, TasksType} from "./App";

type TodoListNameType = {
    title: string
    task: Array<TasksType>
    removeTask: (id: string,  todoListId: string) => void
    changeFilter: (value: FilterValueType, todoListId: string) => void
    addTask: (task: string,  todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean ,  todoListId: string)=>void
    filter: string
    id: string
    removeTodoList: (todoListId: string)=>void
}


export function TodoList(props: TodoListNameType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {

            props.addTask(newTaskTitle.trim(), props.id);
            setNewTaskTitle("")
        }
    }
    const onClickAddNewTaskHandler = () => {
        if(newTaskTitle.trim() !==""){
            props.addTask(newTaskTitle, props.id);
            setNewTaskTitle("")
        } else {
            setError("title is required")
        }

    }
    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const removeTodoList = () => props.removeTodoList(props.id)
    return (
        <div>
            <div>
                <h3>{props.title}
                <button onClick={removeTodoList}>x</button>
                </h3>
                <div>
                    <input value={newTaskTitle} onChange={onNewTitleChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           className={error ? "error" : ""}
                    />
                    <button onClick={onClickAddNewTaskHandler}>+
                    </button>
                    {error && <div className={"error-message"}>{error}</div>}
                </div>
                <ul>
                    {props.task.map((t) => {
                        const onClickHandler = () => props.removeTask(t.id, props.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }

                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={onChangeHandler}
                                />
                                <span>{t.title}</span>
                                <button onClick={onClickHandler}>x</button>
                            </li>
                        )
                    })}

                </ul>
                <div>
                    <button className={props.filter==="all" ? "active-filter" : ""} onClick={onAllClickHandler}>All
                    </button>
                    <button className={props.filter==="active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active
                    </button>
                    <button className={props.filter==="completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed
                    </button>
                </div>
            </div>
        </div>

    )
}