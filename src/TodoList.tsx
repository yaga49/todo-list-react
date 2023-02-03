import React, {ChangeEvent} from "react";
import {FilterValueType, TasksType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodoListNameType = {
    title: string
    task: Array<TasksType>
    removeTask: (id: string,  todoListId: string) => void
    changeFilter: (value: FilterValueType, todoListId: string) => void
    addTask: (task: string,  todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean ,  todoListId: string)=>void
    changeTaskTitle: (taskId: string, newTitle: string ,  todoListId: string)=>void
    filter: string
    id: string
    removeTodoList: (todoListId: string)=>void
    ChangeTodoListTitle: (id: string, newTitle: string)=>void
}


export function TodoList(props: TodoListNameType) {


    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const removeTodoList = () => props.removeTodoList(props.id)
    const ChangeTodoListTitle = (newTitle: string) => {
        props.ChangeTodoListTitle(props.id, newTitle)
    }
    const addTask = (task: string) => {
      props.addTask(task, props.id)
    }
    return (
        <div>
            <div>
                <h3>
                    <EditableSpan title={props.title} onChangeTitle={ChangeTodoListTitle}/>

                <button onClick={removeTodoList}>x</button>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul>
                    {props.task.map((t) => {
                        const onClickHandler = () => props.removeTask(t.id, props.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitle = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={onChangeHandler}
                                />

                                <EditableSpan
                                    title={t.title}
                                    onChangeTitle={onChangeTitle}
                                />
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


