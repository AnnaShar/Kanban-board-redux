import React from 'react';
import {useDispatch} from 'react-redux';
import {addTask} from '../redux-store/actions.js';
import {TextToAdd} from '../service-components/TextToAdd.js';
import texts from '../constants/texts.js';
import {ItemType} from '../constants/constants.js';
import './BoardAddTaskButton.css';


export const BoardAddTaskButton = ({columnID}) => {
    const dispatch = useDispatch();

    const handleAdding = (taskName) => {
        dispatch(addTask({name: taskName}, columnID));
    }

    return (
        <TextToAdd
            saveItem={handleAdding}
            itemTexts={texts.addTask}
            showError={false}
            type={ItemType.Task}
        />
    );
}