import React, {useState} from 'react';
import {Keys} from '../constants/constants.js';
import EditIcon from '../images/edit-icon-18.svg';

import './EditableText.css';


export const EditableText = ({value, saveChanges, editButton = false, className, multipleRows = false}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isInputEmpty, setIsInputEmpty] = useState(false);
    const [text, setText] = useState(value);
    const [previousText, setPreviousText] = useState(value);

    const handleEditClick = () => {
        setIsEdit(true);
    };

    const updateText = ({target}) => {
        setText(target.value);
        setIsInputEmpty(target.value === '');
    };

    const handleKeyDown = (e) => {
        if (e.key === Keys.Enter) {
            setIsEdit(false);

            if (!isInputEmpty) {
                saveText();
            } else {
                setText(previousText);
                setIsInputEmpty(false);
            }
        }
    };

    const handleBlur = () => {
        setIsEdit(false);

        if (!isInputEmpty) {
            saveText();
        } else {
            setText(previousText);
            setIsInputEmpty(false);
        }
    };

    const handleFocus = (e) => {
        const temp_value = e.target.value
        e.target.value = ''
        e.target.value = temp_value
    }

    const saveText = () => {
        saveChanges(text);
        setPreviousText(text);
    }

    return (<>
            {!isEdit &&
            <div
                onClick={!editButton ? handleEditClick : (e) => e.preventDefault()}
                className={`editable-text__text ${className}__text`}>
                {text}

                {editButton &&
                <div className='edit-task-button'
                     onClick={handleEditClick}>
                    <EditIcon/>
                </div>
                }
            </div>}

            {isEdit && (multipleRows ?
                    <textarea
                        autoFocus
                        className={`editable-text__textarea editable-${className}__textarea ${isInputEmpty ? 'error-input' : ''}`}
                        value={text}
                        onChange={updateText}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                    />
                    :
                    <input
                        autoFocus
                        className={`editable-text__input editable-${className}__input ${isInputEmpty ? 'error-input' : ''}`}
                        type='text'
                        value={text}
                        onChange={updateText}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                    />
            )
            }
        </>
    )
}