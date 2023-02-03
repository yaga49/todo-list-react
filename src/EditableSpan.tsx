import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChangeTitle: (value: string)=>void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState("")

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChangeTitle(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)


    return (
        editMode
            ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus={true}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>

    )
}