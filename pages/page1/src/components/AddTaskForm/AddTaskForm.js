import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import { createNewTask, sendTask } from '../../store/actions';

import './AddTaskForm.css';

const AddTaskForm = () => {
    const dispatch = useDispatch();
    const newTask = useSelector(state => state.newTask);   

    const create =(e) => {
        dispatch(createNewTask(e.target.value));
    };

    const add =(e) => {
        e.preventDefault()
        dispatch(sendTask());
    };
  
    return (
        <form className = "row">
            <input className = "inputText" type="text" onChange={create} value={newTask} placeholder = "Введите задачу"/>
            <button className = "btn" type = "submit" onClick={add}>Добавить</button>
        </form>
    );
};

export default AddTaskForm;