import {CREATE_NEW_TASK, DELETE_TASK, FETCH_TASK, FETCH_TASK_SUCCESS, FETCH_TASK_ERROR, SEND_TASK, SEND_TASK_SUCCESS, SEND_TASK_ERROR, SEND_DELETE_TASK_SUCCESS, SEND_DELETE_TASK_ERROR} from  './actionTypes';

const initialState = {
    todos: [],   
    loading: false,
    error: null,
    newTask: ''
};
console.log(initialState)

const reducer =(state=initialState, action) => {
    switch(action.type) {
        case CREATE_NEW_TASK: 
            return{...state, newTask: action.value};
        case DELETE_TASK:
            return{...state};
        case SEND_DELETE_TASK_SUCCESS:
            return {...state};
        case SEND_DELETE_TASK_ERROR:
            return {...state, error: action.error};
        case FETCH_TASK:
            return{...state};
        case FETCH_TASK_SUCCESS:
            return{...state, todos: action.value};
        case FETCH_TASK_ERROR: 
            return{...state, error: action.error};
        case SEND_TASK:
            return{...state};
        case SEND_TASK_SUCCESS:
            return{...state};
        case SEND_TASK_ERROR:
            return{...state, error: action.error}; 
        default: return state;
    }
};
export default reducer;