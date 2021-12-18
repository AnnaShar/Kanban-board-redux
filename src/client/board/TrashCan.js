import React, {useState, useContext, useEffect} from 'react'
import DeleteIcon from '../images/delete_icon.svg';
import {DroppableContainer} from '../drag-drop-components/DroppableContainer.js';
import {TrashCanContext} from '../context-store/trash-can-context.js';
import {ItemType, Direction, IDs} from '../constants/constants.js';

import './TrashCan.css';



export const TrashCan = () => {
    const {trashCanActive, deletingType} = useContext(TrashCanContext);
    const [showColumnTrash, setShowColumnTrash] = useState(false);
    const [showTaskTrash, setShowTaskTrash] = useState(false);

    useEffect(() => {
        setShowTaskTrash(trashCanActive && deletingType === ItemType.Task);
        setShowColumnTrash(trashCanActive && deletingType === ItemType.Column);
    }, [deletingType, trashCanActive])

    return (
        <>
            <DroppableContainer
                droppableId={IDs.TrashCanColumn}
                direction={Direction.Horizontal}
                type={ItemType.Column}
                className={`trash-can ${showColumnTrash ? 'trash-can--shown' : 'trash-can--hidden'}`}>

                <DeleteIcon/>

            </DroppableContainer>

            <DroppableContainer
                droppableId={IDs.TrashCanTask}
                direction={Direction.Horizontal}
                type={ItemType.Task}
                className={`trash-can ${showTaskTrash ? 'trash-can--shown' : 'trash-can--hidden'}`}>

                <DeleteIcon/>

            </DroppableContainer>
        </>
    );
}