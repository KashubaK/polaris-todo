export const newTodo = todo => ({
    type: "NEW_TODO",
    payload: { todo }
});

export const editTodo = todo => ({
    type: "EDIT_TODO",
    payload: { todo }
});

export const removeTodo = todo => ({
    type: "REMOVE_TODO",
    payload: { todo }
});

export const selectTodo = todo => ({
    type: "SELECT_TODO",
    payload: { todo }
})

export const duplicateTodo = todo => ({
    type: "DUPLICATE_TODO",
    payload: { todo }
})