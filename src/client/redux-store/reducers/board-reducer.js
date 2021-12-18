import {LOAD_BOARD_FETCHING, LOAD_BOARD_SUCCESS, LOAD_BOARD_ERROR,
    CHANGE_BOARD_NAME_UPDATING, CHANGE_BOARD_NAME_SUCCESS, CHANGE_BOARD_NAME_ERROR} from "../actions.js";

const initialState = {
    board: {},
    loading: false,
    error: ''
};

export const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BOARD_FETCHING: {
            return {
                ...state,
                loading: true,
                error:''
            };
        }
        case LOAD_BOARD_SUCCESS: {
            return {
                ...state,
                board: action.data,
                loading: false
            }
        }
        case LOAD_BOARD_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }
        case CHANGE_BOARD_NAME_UPDATING: {
            return {
                ...state,
                loading: true,
                error:''
            };
        }
        case CHANGE_BOARD_NAME_SUCCESS: {
            return {
                ...state,
                board: {
                    ...state.board,
                    name: action.name
                },
                loading: false
            }
        }
        case CHANGE_BOARD_NAME_ERROR: {
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