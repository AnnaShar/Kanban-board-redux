import React from 'react';
import {Draggable} from 'react-beautiful-dnd';


export const DraggableContainer = ({children, draggableId, index, type, className}) => {
    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided) =>
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    datatype={type}
                    className={`draggable-container ${className}`}>
                    {children}
                </div>
            }
        </Draggable>
    );
}