import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
            <input value={newTaskTitle} onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={onClickAddNewTaskHandler}>+
            </button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}