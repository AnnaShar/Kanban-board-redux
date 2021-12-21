import React from 'react';
import {useDispatch} from 'react-redux';
import {addColumn} from '../redux-store/actions.js';
import {TextToAdd} from '../service-components/TextToAdd.js';
import texts from '../constants/texts.js';
import {ItemType} from '../constants/constants.js';

import './BoardAddColumnButton.css';


export const BoardAddColumnButton = () => {
    const dispatch = useDispatch();

    const handleAddColumn = (name) => {
        dispatch(addColumn(name));
    }

    return (
        <TextToAdd
            saveItem={handleAddColumn}
            itemTexts={texts.addColumn}
            showError={true}
            type={ItemType.Column}
            classNames='board-column'
        />
    );
}