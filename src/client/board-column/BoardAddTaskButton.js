import React, {useContext} from 'react';
import {BoardStoreContext} from '../context-store/board-store-context.js';
import {TextToAdd} from '../service-components/TextToAdd.js';
import texts from '../constants/texts.js';
import {ItemType} from '../constants/constants.js';
import './BoardAddTaskButton.css';


export const BoardAddTaskButton = ({columnID}) => {
    const {addTask} = useContext(BoardStoreContext);

    const handleAdding = (taskName) => {
        addTask({name: taskName}, columnID);
    }

    return (
        <TextToAdd
            saveItem={handleAdding}
            itemTexts={texts.addTask}
            showError={false}
            type={ItemType.Task}
        />
    );
}