import {userReducer} from "./user-reducer";

test('user reducer should increment only age', ()=>{
    const startState = {age: 20, childrenCount: 26, name: 'Dimych'}

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test('user reducer should increment only childrenCount', ()=>{
    const startState = {age: 20, childrenCount: 26, name: 'Dimych'}

})

test('user reducer should name of user', ()=>{
    const startState = {name: 'Dimych', age: 20, childrenCount: 2}
    const newName = 'Victor'

    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState.name).toBe(newName)
})