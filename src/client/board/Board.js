import React, {useContext, useEffect} from 'react';
import {BoardHeader} from './BoardHeader.js';
import {BoardBody} from './BoardBody.js';
import {BoardFooter} from './BoardFooter.js';
import {DragDropContextContainer} from '../drag-drop-components/DragDropContextContainer.js';
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import {BoardStoreContext} from '../context-store/board-store-context.js';
import {loadBoard} from "../redux-store/actions.js";
import {useDispatch, useSelector} from "react-redux";

import './Board.css';

export const Board = () => {
    const {moveTask, moveColumn} = useContext(BoardStoreContext);
    const {theme} = useContext(UserSettingsContext);
    const dispatch = useDispatch();
    const board = useSelector(state => state.board);

    useEffect(async () => {
        dispatch(loadBoard());
    }, []);

    const boardThemeColors = {
        '--theme-color-base': theme.base,
        '--theme-color-light': theme.light,
        '--theme-color-dark': theme.dark
    }

    return (
        <>
            {board && board.name &&
            <div className='board'
                 style={boardThemeColors}>

                <DragDropContextContainer
                    moveTask={moveTask}
                    moveColumn={moveColumn}>

                    <BoardHeader
                        name={board.name}
                    />

                    <BoardBody/>

                    <BoardFooter/>

                </DragDropContextContainer>
            </div>}
        </>
    );
}