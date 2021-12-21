import React from 'react';
import {useSelector} from 'react-redux';
import {selectTasksByColumn} from '../redux-store/reducers/selectors.js';
import {BoardTask} from './BoardTask.js';
import {BoardColumnHeader} from './BoardColumnHeader.js';
import {BoardAddTaskButton} from './BoardAddTaskButton.js';
import {DraggableContainer} from '../drag-drop-components/DraggableContainer.js';
import {DroppableContainer} from '../drag-drop-components/DroppableContainer.js';
import {ItemType, Direction} from '../constants/constants.js';

import './BoardColumn.css';


export const BoardColumn = ({column, index}) => {
    const tasks = useSelector(selectTasksByColumn(column.id));

    const columnBody = tasks.map((task, index) =>
        <BoardTask
            key={task.id}
            task={task}
            index={index}
        />
    );

    return (
        <DraggableContainer
            draggableId={column.id}
            index={index}
            type={ItemType.Column}
            className={`board__board-column board-column ${column.isDeleting ? 'board-column--deleting' : ''}`}>

                <BoardColumnHeader
                    name={column.name}
                    id={column.id}
                />

                <DroppableContainer
                    droppableId={column.id}
                    direction={Direction.Vertical}
                    type={ItemType.Task}
                    className='board_column__body'>

                    {columnBody}

                </DroppableContainer>

                <BoardAddTaskButton
                    columnID={column.id}
                />

        </DraggableContainer>

    );
}