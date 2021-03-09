import {CREATE_NEW_TASK, DELETE_TASK, FETCH_TASK, FETCH_TASK_SUCCESS, FETCH_TASK_ERROR, SEND_TASK, SEND_TASK_SUCCESS, SEND_TASK_ERROR, SEND_DELETE_TASK_ERROR, SEND_DELETE_TASK_SUCCESS} from  './actionTypes';
import axiosToDo from "../axiosToDo";
import axios from 'axios';

export const createNewTask =(value)=> {
    return {type: CREATE_NEW_TASK, value}
};

export const deleteSelectedTask =(id) => {
    return {type: DELETE_TASK, id}
};

const fetchTaskRequest = () => {
    return {type: FETCH_TASK};
};
  
const fetchTaskSuccess = value => {
return {type: FETCH_TASK_SUCCESS, value};
};

const fetchTaskError = error => {
return {type: FETCH_TASK_ERROR, error};
};

const sendTaskRequest = () => {
    return{type: SEND_TASK};
};

const sendTaskSuccess = task => {
    return {type: SEND_TASK_SUCCESS, task};
};

const sendTaskError = error => {
    return {type: SEND_TASK_ERROR, error};
};

const sendDeleteTaskSuccess = () => {
    return {type: SEND_DELETE_TASK_SUCCESS}
};

const sendDeleteTaskError =() => {
    return {type: SEND_DELETE_TASK_ERROR}
};
  
export const fetchTask =() => {
    return async dispatch => {
        dispatch(fetchTaskRequest());
        try {
            let array =[];
            const response = await axiosToDo.get("tasks.json");
            if(response.data) {
                Object.keys(response.data).forEach(id => {
                    const task = {
                        text: response.data[id].text,
                        id: id
                    };
                    array.push(task);
                });
            dispatch(fetchTaskSuccess(array));
        }} catch(e) {
            dispatch(fetchTaskError(e));
        }
    };
};

export const sendTask =() => {
    return async (dispatch, getState) => {
        const cur_task = getState();
        dispatch(sendTaskRequest());
        try {
            const response = await axios.post("https://js7-server-default-rtdb.firebaseio.com/tasks.json", {text: cur_task.newTask});
            dispatch(sendTaskSuccess(response.data));
            try {
                let array = [];
                const response = await axiosToDo.get("tasks.json")
                if(response.data) {
                    Object.keys(response.data).forEach(id => {
                        const task = {
                            text: response.data[id].text,
                            id: id
                        };
                        array.push(task);
                    });
                dispatch(fetchTaskSuccess(array));
            }} catch(e) {
            dispatch(fetchTaskError(e));
            }
        } catch(e) {
            dispatch(sendTaskError(e));
        }
    };
};

export const sendDeleteTask =(id) => {
    return async dispatch => {
        dispatch(deleteSelectedTask());
        try {
            await axiosToDo.delete("tasks/" + id + ".json");
            dispatch(sendDeleteTaskSuccess());
            try {
                let array = [];
                const response = await axiosToDo.get("tasks.json");
                if(response.data) {
                    Object.keys(response.data).forEach(id => {
                        const task = {
                            text: response.data[id].text,
                            id: id
                        };
                        array.push(task);
                    });
                dispatch(fetchTaskSuccess(array));
            }} catch(e) {
            dispatch(fetchTaskError(e));
            }
        } catch(e) {
            dispatch(sendDeleteTaskError(e));
        }
    };    
};



