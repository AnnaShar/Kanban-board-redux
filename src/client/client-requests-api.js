import RequestError from './error.js';

const url = 'http://localhost:8080/api/board';

const handleRequest = async (handler) => {
    const response = await handler();
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new RequestError(response.status, errorMessage);
    } else {
        return await response.json();
    }
};


const getBoard = async () => {
    return handleRequest(async () => {
        return await fetch(`${url}`);
    });
};

const addTask = async (task, columnID) => {
    return handleRequest(async () => {
        return await fetch(`${url}/tasks/add/${columnID}`, {
            method: 'POST',
            body: JSON.stringify(task)
        });
    });
};

const addColumn = async (name) => {
    return handleRequest(async () => {
        return await fetch(`${url}/columns/add`, {
            method: 'POST',
            body: JSON.stringify({columnName: name})
        });
    });
};

const moveTask = async (taskID, source, destination) => {
    return handleRequest(async () => {
        return await fetch(`${url}/tasks/move/${taskID}`, {
            method: 'PATCH',
            body: JSON.stringify({source: source, destination: destination})
        });
    });
};

const deleteTask = async (taskID, columnID) => {
    return handleRequest(async () => {
        return await fetch(`${url}/tasks/delete`, {
            method: 'DELETE',
            body: JSON.stringify({taskID: taskID, columnID: columnID})
        });
    });
};

const moveColumn = async (columnID, sourceIndex, destinationIndex) => {
    return handleRequest(async () => {
        return await fetch(`${url}/columns/move/${columnID}`, {
            method: 'PATCH',
            body: JSON.stringify({sourceIndex: sourceIndex, destinationIndex: destinationIndex})
        });
    });
};

const deleteColumn = async (columnID) => {
    return handleRequest(async () => {
        return await fetch(`${url}/columns/delete/${columnID}`, {
            method: 'DELETE'
        });
    });
};

const changeColumnName = async (columnID, columnName) => {
    return handleRequest(async () => {
        return await fetch(`${url}/columns/edit/${columnID}`, {
            method: 'PATCH',
            body: JSON.stringify({columnName: columnName})
        });
    });
};

const changeBoardName = async (boardName) => {
    return handleRequest(async () => {
        return await fetch(`${url}/edit`, {
            method: 'PATCH',
            body: JSON.stringify({boardName: boardName})
        });
    });
};
const changeTaskName = async (taskID, taskName) => {
    return handleRequest(async () => {
        return await fetch(`${url}/tasks/edit/${taskID}`, {
            method: 'PATCH',
            body: JSON.stringify({taskName: taskName})
        });
    });
};

export default {
    getBoard,
    moveTask,
    addTask,
    deleteTask,
    addColumn,
    moveColumn,
    deleteColumn,
    changeColumnName,
    changeBoardName,
    changeTaskName
}