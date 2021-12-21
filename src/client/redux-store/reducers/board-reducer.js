import actionNames from '../action-names.js';

const initialState = {
    board: {},
    loading: false,
    error: ''
};

export const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionNames.LOAD_BOARD_FETCHING: {
            return {
                ...state,
                loading: true,
                error: ''
            };
        }
        case actionNames.LOAD_BOARD_SUCCESS: {
            return {
                ...state,
                board: action.data,
                loading: false
            }
        }
        case actionNames.LOAD_BOARD_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }
        case actionNames.CHANGE_BOARD_NAME_UPDATING: {
            return {
                ...state,
                loading: true,
                error: ''
            };
        }
        case actionNames.CHANGE_BOARD_NAME_SUCCESS: {
            return {
                ...state,
                board: {
                    ...state.board,
                    name: action.name
                },
                loading: false
            }
        }
        case actionNames.CHANGE_BOARD_NAME_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        case actionNames.CHANGE_COLUMN_NAME_UPDATING: {
            return {
                ...state,
                loading: true,
                error: ''
            };
        }
        case actionNames.CHANGE_COLUMN_NAME_SUCCESS: {
            return {
                ...state,
                board: {
                    ...state.board,
                    columns: {
                        ...state.board.columns,
                        [action.id]: {
                            ...state.board.columns[action.id],
                            name: action.name
                        }
                    }
                },
                loading: false
            }
        }
        case actionNames.CHANGE_COLUMN_NAME_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        case actionNames.CHANGE_TASK_NAME_UPDATING: {
            return {
                ...state,
                loading: true,
                error: ''
            };
        }
        case actionNames.CHANGE_TASK_NAME_SUCCESS: {
            return {
                ...state,
                board: {
                    ...state.board,
                    tasks: {
                        ...state.board.tasks,
                        [action.id]: {
                            ...state.board.tasks[action.id],
                            name: action.name
                        }
                    }
                },
                loading: false
            }
        }

        case actionNames.CHANGE_TASK_NAME_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        case actionNames.ADD_TASK_PROCESSING: {
            return {
                ...state,
                loading: true,
                error: ''
            };
        }
        case actionNames.ADD_TASK_SUCCESS: {
            const task = action.data;
            const tasksOrder = [...state.board.columns[action.columnID].tasks, task.id];
            return {
                ...state,
                board: {
                    ...state.board,
                    columns: {
                        ...state.board.columns,
                        [action.columnID]: {
                            ...state.board.columns[action.columnID],
                            tasks: tasksOrder
                        }
                    },
                    tasks: {
                        ...state.board.tasks,
                        [task.id]: task
                    }
                },
                loading: false
            }
        }

        case actionNames.ADD_TASK_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        case actionNames.ADD_COLUMN_PROCESSING: {
            return {
                ...state,
                loading: true,
                error: ''
            };
        }
        case actionNames.ADD_COLUMN_SUCCESS: {

            const column = action.data;
            return {
                ...state,
                board: {
                    ...state.board,
                    columnsOrder: [...state.board.columnsOrder, column.id],
                    columns: {
                        ...state.board.columns,
                        [column.id]: {
                            ...column
                        }
                    }
                },
                loading: false
            }
        }

        case actionNames.ADD_COLUMN_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        case actionNames.DELETE_COLUMN_PROCESSING: {
            return {
                ...state,
                loading: true,
                error: ''
            };
        }
        case actionNames.DELETE_COLUMN_DELETING_START: {
            const {[action.id]: removedColumn, ...restColumns} = state.board.columns;
            let restTasks = state.board.tasks;
            state.board.columns[action.id].tasks.forEach(task => delete restTasks[task]);

            return {
                ...state,
                board: {
                    ...state.board,
                    columnsOrder: state.board.columnsOrder.filter(column => column !== action.id),
                    columns: restColumns,
                    tasks: restTasks
                },
                loading: false
            }
        }
        case actionNames.SET_DELETING_STATE_COLUMN: {
            return {
                ...state,
                board: {
                    ...state.board,
                    columns: {
                        ...state.board.columns,
                        [action.id]: {
                            ...state.board.columns[action.id],
                            isDeleting: action.isDeleting
                        }
                    }
                },
                loading: false
            };
        }
        case actionNames.DELETE_COLUMN_SUCCESS: {
            return {
                ...state,
                loading: false
            };
        }

        case actionNames.DELETE_COLUMN_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        default: {
            return state;
        }
    }
}