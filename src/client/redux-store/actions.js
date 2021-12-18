import Api from "../client-requests-api.js"

export const LOAD_BOARD_FETCHING = 'REDUX_THUNK_LOAD_BOARD_FETCHING';
export const LOAD_BOARD_SUCCESS = 'REDUX_THUNK_LOAD_BOARD_SUCCESS';
export const LOAD_BOARD_ERROR = 'REDUX_THUNK_LOAD_BOARD_ERROR';
export const CHANGE_BOARD_NAME_UPDATING = 'CHANGE_BOARD_NAME_UPDATING';
export const CHANGE_BOARD_NAME_SUCCESS = 'CHANGE_BOARD_NAME_UPDATING';
export const CHANGE_BOARD_NAME_ERROR = 'CHANGE_BOARD_NAME_UPDATING';

export const loadBoard = () => dispatch => {
    dispatch({ type: LOAD_BOARD_FETCHING });
    Api.getBoard()
        .then(
            data => dispatch({ type: LOAD_BOARD_SUCCESS, data }),
            error => dispatch({ type: LOAD_BOARD_ERROR, error: error.message || 'Unexpected Error!!!' })
        )
};

export const changeBoardName = (name) => dispatch => {
    dispatch({ type: CHANGE_BOARD_NAME_UPDATING });
    Api.changeBoardName(name)
        .then(
            () => dispatch({ type: CHANGE_BOARD_NAME_SUCCESS, name }),
            error => dispatch({ type: CHANGE_BOARD_NAME_ERROR, error: error.message || 'Unexpected Error!!!' })
        )
}