import {v1} from "uuid";
import {FilterValueType, TodolistType} from "../App";
import {
    AddTodolistAC, ChangeTodolistFilterAC,
    ChangeTodolistFilterActionType,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todoListsReducer
} from "./todolists-reducer";




test('correct todoList should be removed', ()=>{
    let todoListId1 = v1()
    let todoListId2 = v1()

    const startState: TodolistType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, RemoveTodolistAC(todoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('correct todoList should be added',()=>{
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTodoListTitle = 'New TodoList'

    const startState: TodolistType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, AddTodolistAC(newTodoListTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
    expect(endState[2].filter).toBe("all")
})

test('correct todoList should change its name', ()=>{
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTodoListTitle = 'New TodoList'

    const startState: TodolistType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]

    const action = ChangeTodolistTitleAC(todoListId2, newTodoListTitle)

    const endState = todoListsReducer(startState,action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct todoList should be changed ', ()=>{
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newFilter: FilterValueType = 'completed'

    const startState: TodolistType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]

    const action = ChangeTodolistFilterAC(todoListId2, newFilter)

    const endState = todoListsReducer(startState,action)

    expect(endState[0].title).toBe('all')
    expect(endState[1].title).toBe(newFilter)
})








