import {getDataFromFile, updateFile} from './file-data-handler.js';
import config from './config.js';
import RequestError from './request-error.js';

const filePath = config['tasksFilePath'];
let board = null;

const getBoard = () => {
    if (!board) {
        try {
            board = getDataFromFile(filePath);
        } catch (e) {
            throw new RequestError(404, 'Tasks not found.');
        }
    }
    return board;
};

const getAllTasks = () => {
    const board = getBoard();
    return Object.values(board.tasks);
}

const getColumns = () => {
    const board = getBoard();
    return Object.values(board.columns);
}

const getTasksByColumn = (columnID) => {
    const board = getBoard();
    const column = board.columns[columnID];
    if (column) {
        const tasksIDs = column.tasks;
        return tasksIDs.map(id => board.tasks[id]);
    } else {
        throw new RequestError(404, `There is no column with id ${columnID}.`);
    }
}

const getBoardInfo = () => {
    const board = getBoard();
    return {
        id: board.id,
        name: board.name,
        columns: Object.values(board.columns)
    }
}

const changeBoardName = ({boardName}) => {
    const board = getBoard();
    board.name = boardName;

    updateBoardFile();
    return true;
}

const moveTask = (taskID, {source, destination}) => {
    const board = getBoard();
    let task = board.tasks[taskID];

    if (!task) throw new RequestError(404, `Task with id ${taskID} does not found.`);
    if (!board.columns[source.id]) throw new RequestError(400, `Bad request. Source column is not found.`);
    if (!board.columns[destination.id]) throw new RequestError(400, `Bad request. Destination column is not found.`);

    board.columns[source.id].tasks.splice(source.index, 1);
    board.columns[destination.id].tasks.splice(destination.index, 0, taskID);

    updateBoardFile();
    return true;
}

const deleteTask = ({taskID, columnID}) => {
    const board = getBoard();
    let task = board.tasks[taskID];

    if (!task) throw new RequestError(404, `Task with id ${taskID} does not found.`);

    const columnTasks = board.columns[columnID].tasks.filter(task => task !== taskID);
    const {[taskID]: removedTask, ...restTasks} = board.tasks;

    board.columns[columnID].tasks = columnTasks;
    board.tasks = restTasks;

    updateBoardFile();
    return true;
}

const updateTask = (task, newProperties) => {
    return {
        ...task,
        ...newProperties
    }
}

const addTask = (columnID, task) => {
    const board = getBoard();

    const newTaskID = getNewTaskID();
    const newTask = {
        id: newTaskID,
        ...task
    };

    board.tasks[newTaskID] = newTask;
    board.columns[columnID].tasks.push(newTaskID);

    updateBoardFile();

    return newTask;
};

const addColumn = ({columnName}) => {
    const board = getBoard();

    const newColumnID = getNewColumnID();
    const newColumn = {
        id: newColumnID,
        name: columnName,
        tasks: []
    };

    board.columns[newColumnID] = newColumn;
    board.columnsOrder.push(newColumnID);

    updateBoardFile();

    return newColumn;
};

const moveColumn = (columnID, {sourceIndex, destinationIndex}) => {
    const board = getBoard();
    let column = board.columns[columnID];

    if (!column) throw new RequestError(404, `Column with id ${columnID} does not found.`);

    board.columnsOrder.splice(sourceIndex, 1);
    board.columnsOrder.splice(destinationIndex, 0, columnID);

    updateBoardFile();
    return true;
}

const deleteColumn = (columnID) => {
    const board = getBoard();
    let column = board.columns[columnID];

    if (!column) throw new RequestError(404, `Column with id ${columnID} does not found.`);

    board.columnsOrder = board.columnsOrder.filter(column => column !== columnID);
    board.columns[columnID].tasks.forEach(task => delete board.tasks[task]);
    delete board.columns[columnID];

    updateBoardFile();
    return true;
}

const changeColumnName = (columnID, {columnName}) => {
    const board = getBoard();
    let column = board.columns[columnID];

    if (!column) throw new RequestError(404, `Column with id ${columnID} does not found.`);

    board.columns[columnID].name = columnName;

    updateBoardFile();
    return true;
}

const changeTaskName = (taskID, {taskName}) => {
    const board = getBoard();
    let task = board.tasks[taskID];

    if (!task) throw new RequestError(404, `Task with id ${taskID} does not found.`);

    board.tasks[taskID].name = taskName;

    updateBoardFile();
    return true;
}

const updateBoardFile = () => {
    const board = getBoard();

    try {
        updateFile(filePath, board);
    } catch (e) {
        throw new RequestError(500, 'Data updating error.');
    }
};

const getNewTaskID = () => {
    const board = getBoard();
    const newID = board.metadata.lastTaskID + 1;

    board.metadata.lastTaskID = newID;
    updateBoardFile();

    return `t${newID}`;
}
const getNewColumnID = () => {
    const board = getBoard();
    const newID = board.metadata.lastColumnID + 1;

    board.metadata.lastColumnID = newID;
    updateBoardFile();

    return `c${newID}`;
}

export default {
    getBoard,
    getAllTasks,
    getColumns,
    getTasksByColumn,
    getBoardInfo,
    moveTask,
    deleteTask,
    addTask,
    addColumn,
    moveColumn,
    deleteColumn,
    changeColumnName,
    changeBoardName,
    changeTaskName
}