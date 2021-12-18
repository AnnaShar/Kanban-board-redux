import React, {useContext} from 'react';
import {DraggableContainer} from '../drag-drop-components/DraggableContainer.js';
import {EditableText} from '../service-components/EditableText.js';
import {BoardStoreContext} from '../context-store/board-store-context.js';
import {ItemType} from '../constants/constants.js';

import './BoardTask.css';


export const BoardTask = ({task, index}) => {

    const {changeTaskName} = useContext(BoardStoreContext);

    const saveTaskName = (name) => {
        changeTaskName(task.id, name)
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