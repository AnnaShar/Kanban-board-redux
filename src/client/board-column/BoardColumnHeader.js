import React, {useContext} from 'react';
import {BoardStoreContext} from '../context-store/board-store-context.js';
import {EditableText} from '../service-components/EditableText.js';

import './BoardColumnHeader.css';


export const BoardColumnHeader = ({id, name}) => {
    const {changeColumnName} = useContext(BoardStoreContext);

    const editName = (text) => {
        changeColumnName(id, text);
    }

    return (
        <div className='board-column__header column-header'>

            <EditableText
                className='column-header'
                value={name}
                saveChanges={editName}
            />
        </div>
    );
}