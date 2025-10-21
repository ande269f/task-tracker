import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import { DraggableTaskProvider } from "./DraggableTaskProvider";

export const DroppableTaskField = ({ children }: { children: React.ReactNode }) => {
  return (
    <Droppable droppableId="droppable-tasks">
      {(provided) => (
        <DraggableTaskProvider
          innerRef={provided.innerRef}
          droppableProps={provided.droppableProps}
          placeholder={provided.placeholder}
        >
          {children}
        </DraggableTaskProvider>
      )}
    </Droppable>
  );
};