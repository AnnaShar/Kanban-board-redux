import Api from '../client-requests-api.js'
import actionNames from './action-names.js';

export const loadBoard = () => dispatch => {
    dispatch({ type: actionNames.LOAD_BOARD_FETCHING });
    Api.getBoard()
        .then(
            data => dispatch({ type: actionNames.LOAD_BOARD_SUCCESS, data }),
            error => dispatch({ type: actionNames.LOAD_BOARD_ERROR, error: error.message || 'Board loading failed.' })
        );
};

export const changeBoardName = (name) => dispatch => {
    dispatch({ type: actionNames.CHANGE_BOARD_NAME_UPDATING });
    Api.changeBoardName(name)
        .then(
            () => dispatch({ type: actionNames.CHANGE_BOARD_NAME_SUCCESS, name }),
            error => dispatch({ type: actionNames.CHANGE_BOARD_NAME_ERROR, error: error.message || 'Changing board name failed.' })
        );
};

export const changeColumnName = (id, name) => dispatch => {
    dispatch({ type: actionNames.CHANGE_COLUMN_NAME_UPDATING });
    Api.changeColumnName(id, name)
        .then(
            () => dispatch({ type: actionNames.CHANGE_COLUMN_NAME_SUCCESS, id, name }),
            error => dispatch({ type: actionNames.CHANGE_COLUMN_NAME_ERROR, error: error.message || 'Changing column name failed.' })
        );
};

export const changeTaskName = (id, name) => dispatch => {
    dispatch({ type: actionNames.CHANGE_TASK_NAME_UPDATING });
    Api.changeTaskName(id, name)
        .then(
            () => dispatch({ type: actionNames.CHANGE_TASK_NAME_SUCCESS, id, name }),
            error => dispatch({ type: actionNames.CHANGE_TASK_NAME_ERROR, error: error.message || 'Changing task name failed.' })
        );
};

export const addTask = (task, columnID) => dispatch => {
    dispatch({ type: actionNames.ADD_TASK_PROCESSING });
    Api.addTask(task, columnID)
        .then(
            data => dispatch({ type: actionNames.ADD_TASK_SUCCESS, data, columnID }),
            error => dispatch({ type: actionNames.ADD_TASK_ERROR, error: error.message || 'Adding task failed.' })
        );
};

export const addColumn = (name) => dispatch => {
    dispatch({ type: actionNames.ADD_COLUMN_PROCESSING });
    Api.addColumn(name)
        .then(
            data => dispatch({ type: actionNames.ADD_COLUMN_SUCCESS, data }),
            error => dispatch({ type: actionNames.ADD_COLUMN_ERROR, error: error.message || 'Adding column failed.' })
        );
};

export const deleteColumn = (id) => dispatch => {
    dispatch({ type: actionNames.DELETE_COLUMN_PROCESSING });
    dispatch({ type: actionNames.DELETE_COLUMN_DELETING_START, id });
    Api.deleteColumn(id)
        .then(
            () => dispatch({ type: actionNames.DELETE_COLUMN_SUCCESS }),
            error => dispatch({ type: actionNames.DELETE_COLUMN_ERROR, error: error.message || 'Deleting column failed.' })
        );
};

export const deleteTask = (taskID, columnID) => dispatch => {
    dispatch({ type: actionNames.DELETE_TASK_PROCESSING });
    Api.deleteTask(taskID, columnID)
        .then(
            () => dispatch({ type: actionNames.DELETE_TASK_SUCCESS, taskID, columnID }),
            error => dispatch({ type: actionNames.DELETE_TASK_ERROR, error: error.message || 'Deleting task failed.' })
        );
};