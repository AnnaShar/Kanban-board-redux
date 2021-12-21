import React from 'react';
import {useDispatch} from 'react-redux';
import {changeColumnName} from '../redux-store/actions.js';
import {EditableText} from '../service-components/EditableText.js';

import './BoardColumnHeader.css';


export const BoardColumnHeader = ({id, name}) => {
    const dispatch = useDispatch();

    const editName = (text) => {
        dispatch(changeColumnName(id, text));
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