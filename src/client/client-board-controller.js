import React from 'react';
import serverRequest from './client-requests-api.js';
import {showErrorMessage} from './utils/notifier.js';
import texts from './constants/texts.js';
import history from './history.js';


const handleRequest = async (handler, ...requestParams) => {
    try {
        return await handler(...requestParams);
    } catch (e) {
        showErrorMessage(texts.errorMessages.default);
    }
}

const getBoard = async () => {
    try {
        return await serverRequest.getBoard();
    } catch (e) {
        history.push('/error');
    }
}

const addColumn = (columnName) => {
    return handleRequest(serverRequest.addColumn, columnName);
}

const addTask = (task, columnID) => {
    return handleRequest(serverRequest.addTask, task, columnID);
}

const moveTask = (taskID, source, destination) => {
    return handleRequest(serverRequest.moveTask, taskID, source, destination);
}

const deleteTask = (taskID, columnID) => {
    return handleRequest(serverRequest.deleteTask, taskID, columnID);
}

const moveColumn = (columnID, sourceIndex, destinationIndex) => {
    return handleRequest(serverRequest.moveColumn, columnID, sourceIndex, destinationIndex);
}

const deleteColumn = (columnID) => {
    return handleRequest(serverRequest.deleteColumn, columnID);
}

const changeColumnName = (columnID, columnName) => {
    return handleRequest(serverRequest.changeColumnName, columnID, columnName);
}

const changeBoardName = (boardName) => {
    return handleRequest(serverRequest.changeBoardName, boardName);
}

const changeTaskName = (taskID, taskName) => {
    return handleRequest(serverRequest.changeTaskName, taskID, taskName);
}

export default {
    getBoard,
    addColumn,
    addTask,
    moveTask,
    deleteTask,
    moveColumn,
    deleteColumn,
    changeColumnName,
    changeBoardName,
    changeTaskName
}