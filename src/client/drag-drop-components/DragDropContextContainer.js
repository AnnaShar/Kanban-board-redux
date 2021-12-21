import React, {useContext} from 'react';
import {useDispatch} from "react-redux";
import {deleteColumn, deleteTask} from "../redux-store/actions.js";
import actionNames from '../redux-store/action-names.js';
import {DragDropContext} from 'react-beautiful-dnd';
import {TrashCanContext} from '../context-store/trash-can-context.js';
import {ItemType, IDs} from '../constants/constants.js';

export const DragDropContextContainer = ({children, moveTask, moveColumn}) => {
    const dispatch = useDispatch();
    const {showTrashCan, hideTrashCan, setDeletingType} = useContext(TrashCanContext);

    const onDragStart = ({type}) => {
        showTrashCan();
        setDeletingType(type);
    }

    const onDragUpdate = (result) => {
        const {destination, draggableId, type} = result;
        if (!destination) {
            clearVisualEffects(draggableId, type)
            return;
        }
        switch (type) {
            case ItemType.Column:
                dispatch({type: actionNames.SET_DELETING_STATE_COLUMN, id: draggableId, isDeleting: destination.droppableId === IDs.TrashCanColumn})
                break;

            case ItemType.Task:
                dispatch({type: actionNames.SET_DELETING_STATE_TASK, id: draggableId, isDeleting: destination.droppableId === IDs.TrashCanTask})
                break;
        }
    }

    const onDragEnd = (result) => {
        hideTrashCan();

        const {draggableId, source, destination, type} = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId
            && destination.index === source.index) {
            return;
        }

        switch (type) {
            case ItemType.Column:
                dropColumn(draggableId, source, destination);
                break;

            case ItemType.Task:
                dropTask(draggableId, source, destination);
                break;
        }
    }

    const dropTask = (draggableId, source, destination) => {
        if (destination.droppableId === IDs.TrashCanTask) {
            dispatch(deleteTask(draggableId, source.droppableId));
        } else {
            moveTask(draggableId,
                {id: source.droppableId, index: source.index},
                {id: destination.droppableId, index: destination.index});
        }
    }

    const dropColumn = (draggableId, source, destination) => {
        if (destination.droppableId === IDs.TrashCanColumn) {
            dispatch(deleteColumn(draggableId));
        } else {
            moveColumn(draggableId, source.index, destination.index);
        }
    }

    const clearVisualEffects = (draggableId, type) => {
        switch (type) {
            case ItemType.Task:
                dispatch({type: actionNames.SET_DELETING_STATE_TASK, id: draggableId, isDeleting: false})
                break;
            case ItemType.Column:
                dispatch({type: actionNames.SET_DELETING_STATE_COLUMN, id: draggableId, isDeleting: false})
                break;
        }

    }

    return (
        <DragDropContext
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}>
            {children}
        </DragDropContext>
    );
}