import React from 'react';
import './Task.css';

const Task = ({text, deleteTask}) => { 
    return (
        <div className = 'row'>
            <p className = "task">{text}</p>
            <button onClick={deleteTask} type="submit" className="btnDelete">Удалить</button>
        </div>
    );
};

export default Task;