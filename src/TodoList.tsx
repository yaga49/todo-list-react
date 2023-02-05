import React, {ChangeEvent} from "react";
import {FilterValueType, TasksType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

type TodoListNameType = {
    title: string
    task: Array<TasksType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValueType, todoListId: string) => void
    addTask: (task: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    filter: string
    id: string
    removeTodoList: (todoListId: string) => void
    ChangeTodoListTitle: (id: string, newTitle: string) => void
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


                    <IconButton onClick={removeTodoList}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
                <div>
                    {props.task.map((t) => {
                        const onClickHandler = () => props.removeTask(t.id, props.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitle = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }
                        return (
                            <div key={t.id} className={t.isDone ? "is-done" : ""}>
                                <Checkbox
                                       checked={t.isDone}
                                       onChange={onChangeHandler}
                                       color={"secondary"}
                                />

                                <EditableSpan
                                    title={t.title}
                                    onChangeTitle={onChangeTitle}
                                />
                                <IconButton onClick={onClickHandler}>
                                    <Delete/>
                                </IconButton>

                            </div>
                        )
                    })}

                </div>
                <div>

                    <Button variant={props.filter === "all" ? "outlined" : "text"} onClick={onAllClickHandler}>all</Button>
                    <Button variant={props.filter === "active" ? "contained" : "text"} onClick={onActiveClickHandler} color={"secondary"}>Active</Button>
                    <Button variant={props.filter === "completed" ? "contained" : "text"} onClick={onCompletedClickHandler} color={"success"}>Completed</Button>

                </div>
            </div>
        </div>

    )
}


