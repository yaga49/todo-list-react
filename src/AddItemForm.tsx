import {Button, IconButton, TextField} from "@mui/material";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type AddItemFormType = {
    addItem: (title: string) => void

}

export function AddItemForm(props: AddItemFormType) {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {

            props.addItem(newTaskTitle.trim());
            setNewTaskTitle("")
        }
    }
    const onClickAddNewTaskHandler = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle);
            setNewTaskTitle("")
        } else {
            setError("title is required")
        }

    }
    return (
        <div>

            <TextField
                label="Type value"
                variant="outlined"
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={onClickAddNewTaskHandler} color={"primary"}>
                <AddCircleOutlineIcon/>
            </IconButton >
        </div>
    )
}