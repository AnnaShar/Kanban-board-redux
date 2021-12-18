import React from 'react';
import UserSettingsProvider from '../context-store/user-settings-context.js';
import BoardDataProvider from '../context-store/board-store-context.js';
import {Board} from './Board.js';
import TrashCanStateProvider from '../context-store/trash-can-context.js';


export const BoardContainer = () => {
    return (
        <UserSettingsProvider>
            <BoardDataProvider>
                <TrashCanStateProvider>
                    <Board/>
                </TrashCanStateProvider>
            </BoardDataProvider>
        </UserSettingsProvider>
    )
}

