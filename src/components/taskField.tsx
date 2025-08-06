import { useSelector } from "react-redux";
import { RootState } from "../store";
import TaskCardMaker from "./TaskCardMaker"
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Container } from "@chakra-ui/react";

const TaskPrinter = () => {
      const userInput = useSelector((state: RootState) => state.form);
      return (
        //printer alle inputs
        userInput.map((input, index) => {
        
            <Draggable draggableId={input.uuid.toString()} index={index}>
                {(provided) => (
                  <div
                  {...this.props}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={this.props.innerRef}>
                    <TaskCardMaker task={input}/>
                  </div>


                )}
            </Draggable>
          }


        ))
}

const DroppableTaskField = () => {
  return (
            <Droppable droppableId=''>
                {(provided) => (
                  
                    <TaskPrinter
                      innerRef={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {provided.placeholder}
                    </TaskPrinter>
              

                )}
            </Droppable>
  )
}

export default DroppableTaskField;