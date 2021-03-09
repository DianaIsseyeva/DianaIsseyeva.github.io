import {useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import { fetchTask, sendTask, sendDeleteTask } from './../../store/actions';
import AddTaskForm from './../AddTaskForm/AddTaskForm';
import Task from './../Task/Task';
import './Content.css'


const Content =() => {
    const content = useSelector(state => state.todos);   
    const dispatch = useDispatch();

    const deleteTask =(id) => {
        dispatch(sendDeleteTask(id));
    };
    
    useEffect(() => {
        dispatch(fetchTask(), sendTask(), sendDeleteTask());
    }, [dispatch]);

    return (
        <div className="Content">
            <AddTaskForm/>
            <div>
            {
                content.map(item => {
                return <Task 
                key={item.id} 
                text={item.text}
                deleteTask = {() => deleteTask(item.id)}
                />
                }) 
            }
            </div>
        </div>
    );
};

export default Content;