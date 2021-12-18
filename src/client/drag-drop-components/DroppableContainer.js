import React from 'react';
import {Droppable} from 'react-beautiful-dnd';


export const DroppableContainer = ({children, droppableId, direction, type, className}) => {
    return (
        <Droppable
            droppableId={droppableId}
            direction={direction}
            type={type}>

            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`droppable-container ${className}`}
                    datatype={type}>
                    {children}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}