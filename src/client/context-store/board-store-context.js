import React, {useState} from 'react';
import boardController from '../client-board-controller.js';

export const BoardStoreContext = React.createContext(null);

export default ({children}) => {
    const [board, setBoard] = useState(null);

    const loadBoardData = async ()=> {
        const boardData = await boardController.getBoard();
        setBoard(boardData);
        return board;
    }

    const addColumn = async (columnName) => {
        const newColumn = await boardController.addColumn(columnName);

        if (newColumn) {
            const newColumnsOrder = [...board.columnsOrder, newColumn.id];
            const newBoard = {
                ...board,
                columnsOrder: newColumnsOrder,
                columns: {
                    ...board.columns,
                    [newColumn.id]: newColumn
                }
            }
            setBoard(newBoard);
        }
    };

    const addTask = async (task, columnID) => {
        const newTask = await boardController.addTask(task, columnID);

        if (newTask) {
            const tasksOrder = [...board.columns[columnID].tasks, newTask.id];
            const newBoard = {
                ...board,
                columns: {
                    ...board.columns,
                    [columnID]: {
                        ...board.columns[columnID],
                        tasks: tasksOrder
                    }
                },
                tasks: {
                    ...board.tasks,
                    [newTask.id]: newTask
                }
            }
            setBoard(newBoard);
        }
    };

    const changeColumnName = async (columnID, columnName) => {
        const backupBoard = {...board};
        setBoard(previousBoard => ({
            ...previousBoard,
            columns: {
                ...previousBoard.columns,
                [columnID]: {
                    ...previousBoard.columns[columnID],
                    name: columnName
                }
            }
        }));

        const changedSuccessfully = await boardController.changeColumnName(columnID, columnName);
        if (!changedSuccessfully) {
            setBoard(backupBoard);
        }
    }

    const changeBoardName = async (boardName) => {
        const backupBoard = {...board};
        setBoard(previousBoard => ({
            ...previousBoard,
            name: boardName
        }));

        const changedSuccessfully = await boardController.changeBoardName(boardName);
        if (!changedSuccessfully) {
            setBoard(backupBoard);
        }
    }

    const moveTask = async (taskID, source, destination) => {
        const backupBoard = {...board};

        let newBoard = {...board};
        newBoard.columns[source.id].tasks.splice(source.index, 1);
        newBoard.columns[destination.id].tasks.splice(destination.index, 0, taskID);

        setBoard(newBoard);

        const movedSuccessfully = await boardController.moveTask(taskID, source, destination);
        if (!movedSuccessfully) {
            setBoard(backupBoard);
        }
    }

    const deleteTask = async (taskID, columnID) => {
        const backupBoard = {...board};
        const columnTasks = board.columns[columnID].tasks.filter(task => task !== taskID);
        const {[taskID]: removedTask, ...restTasks} = board.tasks;

        setBoard(previousBoard => ({
            ...previousBoard,
            columns: {
                ...previousBoard.columns,
                [columnID]: {
                    ...previousBoard.columns[columnID],
                    tasks: columnTasks
                }
            },
            tasks: restTasks
        }));

        const deletedSuccessfully = await boardController.deleteTask(taskID, columnID);
        if (!deletedSuccessfully) {
            setBoard(backupBoard);
        }
    }

    const changeTaskName = async (taskID, name) => {
        const backupBoard = {...board};

        setBoard(previousBoard => ({
            ...previousBoard,
            tasks: {
                ...previousBoard.tasks,
                [taskID]: {
                    ...previousBoard.tasks[taskID],
                    name: name
                }
            }
        }));
        const changedSuccessfully = await boardController.changeTaskName(taskID, name);
        if (!changedSuccessfully) {
            setBoard(backupBoard);
        }
    };

    const moveColumn = async (columnID, sourceIndex, destinationIndex) => {
        const backupBoard = {...board};

        let newBoard = {...board};
        newBoard.columnsOrder.splice(sourceIndex, 1);
        newBoard.columnsOrder.splice(destinationIndex, 0, columnID);

        setBoard(newBoard);

        const movedSuccessfully = await boardController.moveColumn(columnID, sourceIndex, destinationIndex);
        if (!movedSuccessfully) {
            setBoard(backupBoard);
        }
    }

    const deleteColumn = async (columnID) => {
        const backupBoard = {...board};

        const columnsOrder = board.columnsOrder.filter(column => column !== columnID);
        const {[columnID]: removedColumn, ...restColumns} = board.columns;
        let allTasks = board.tasks;
        board.columns[columnID].tasks.forEach(task => delete allTasks[task]);

        setBoard(previousBoard => ({
            ...previousBoard,
            columnsOrder: columnsOrder,
            columns: restColumns,
            tasks: allTasks
        }));

        const deletedSuccessfully = await boardController.deleteColumn(columnID);
        if (!deletedSuccessfully) {
            setBoard(backupBoard);
        }
    }

    const setDeletingStateTask = (taskID, isDeleting) => {
        setBoard(previousBoard => ({
            ...previousBoard,
            tasks: {
                ...previousBoard.tasks,
                [taskID]: {
                    ...previousBoard.tasks[taskID],
                    isDeleting: isDeleting
                }
            }
        }));
    }

    const setDeletingStateColumn = (columnsID, isDeleting) => {
        setBoard(previousBoard => ({
            ...previousBoard,
            columns: {
                ...previousBoard.columns,
                [columnsID]: {
                    ...previousBoard.columns[columnsID],
                    isDeleting: isDeleting
                }
            }
        }));
    }

    const boardContext = {
        board,
        loadBoardData,
        addColumn,
        addTask,
        changeTaskName,
        changeColumnName,
        changeBoardName,
        moveTask,
        deleteTask,
        moveColumn,
        deleteColumn,
        setDeletingStateTask,
        setDeletingStateColumn
    }

    return <BoardStoreContext.Provider value={boardContext}>{children}</BoardStoreContext.Provider>;
}