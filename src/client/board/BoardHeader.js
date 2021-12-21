import React, {useContext} from 'react';
import {useDispatch} from 'react-redux';
import {changeBoardName} from '../redux-store/actions.js';
import {EditableText} from '../service-components/EditableText.js';
import SettingIcon from '../images/settings_icon.svg';
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import {IDs} from '../constants/constants.js';

import './BoardHeader.css';


export const BoardHeader = ({name}) => {
    const {toggleSettings} = useContext(UserSettingsContext);

    const dispatch = useDispatch();

    const editBoardName = (text) => {
        dispatch(changeBoardName(text));
    };

    const handleSettingsClick = (e) => {
        e.preventDefault();
        toggleSettings();
    };

    return (
        <div className='board__header'>
            <EditableText
                className='board-header'
                value={name}
                saveChanges={editBoardName}
            />

            <div className='board__settings-icon settings-icon'
                 id={IDs.SettingsButton}
                 onClick={handleSettingsClick}>

                <SettingIcon/>
            </div>
        </div>
    );
}