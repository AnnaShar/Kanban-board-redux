import React, {useContext} from 'react';
import {useSelector} from 'react-redux';
import {BoardColumn} from '../board-column/BoardColumn.js';
import {BoardSettings} from '../board-settings/BoardSettings.js';
import {BoardAddColumnButton} from './BoardAddColumnButton.js';
import {DroppableContainer} from '../drag-drop-components/DroppableContainer.js';
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import {ItemType, Direction, IDs} from '../constants/constants.js';

import './BoardBody.css';


export const BoardBody = () => {
    const board = useSelector(state => state.board);
    const {isSettingsMenuOpen} = useContext(UserSettingsContext);

    const columns = board.columnsOrder;

    const boardBody = columns.map((columnID, index) => {
        const column = board.columns[columnID];
        return (<BoardColumn
            key={column.id}
            column={column}
            index={index}
        />);
    });


    return (
        <div className='board__body'>
            <div className='board__columns-area'>

                <DroppableContainer
                    droppableId={IDs.Board}
                    direction={Direction.Horizontal}
                    type={ItemType.Column}
                    className='board__columns'>

                    {boardBody}

                </DroppableContainer>

                <BoardAddColumnButton/>

            </div>

            {isSettingsMenuOpen && <BoardSettings/>}
        </div>
    );
}