import React from 'react';
import {useDispatch} from 'react-redux';
import {changeTaskName} from '../redux-store/actions.js';
import {DraggableContainer} from '../drag-drop-components/DraggableContainer.js';
import {EditableText} from '../service-components/EditableText.js';
import {ItemType} from '../constants/constants.js';

import './BoardTask.css';


export const BoardTask = ({task, index}) => {
    const dispatch = useDispatch();

    const saveTaskName = (name) => {
        dispatch(changeTaskName(task.id, name));
    }

    return (
        <DraggableContainer
            draggableId={task.id}
            index={index}
            type={ItemType.Task}
            className={`board-column__item board-column__task ${task.isDeleting ? 'board-column__task--deleting' : ''}`}>

            <EditableText
                className='task'
                value={task.name}
                saveChanges={saveTaskName}
                editButton={true}
                multipleRows={true}
            />

        </DraggableContainer>
    );
}