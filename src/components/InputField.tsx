import { Button, Group, Input } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setTextInput } from "../store/slices/textInputSlice";
import { useState } from "react";
import {v4 as uuid, UUIDTypes} from 'uuid';
import { Toaster, toaster } from "./ui/toaster"


const InputField = () => {
  const dispatch: AppDispatch = useDispatch();
  const [localInput, setLocalInput] = useState<string>("");
  const userInput = useSelector((state: RootState) => state.form);

  const duplicateDetected = (duplicateDetected: Boolean = false) => {
    userInput.forEach(element => {
      if (element.taskText == localInput && element.taskDeleted === null) {
        duplicateDetected =  true;
      }
    }); return duplicateDetected
  }

  // lav en matching der loader igennem alle states. hvis der er et match, smid en fejl
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); 

      //laver ny uuid til taskobjektet og sorteringslisten
      const newUuid: UUIDTypes = uuid()

      //opdatere taskObjekt og sortOrder
      const submitTask = () => {
        dispatch(setTextInput({
          taskText: localInput, 
          taskCompleted: false, 
          dateCreated: new Date(), 
          uuid: newUuid, 
          taskDeleted: null, 
          taskEditsLog: []}))
        setLocalInput("")
      }
      
      

      if (localInput.trim() === "") {

      } else if (!duplicateDetected()){
        submitTask()
        
      } else if (duplicateDetected()) {
          toaster.create({
            description: "Den indtastede task findes allerede",
            type: "warning",
          })
      } else {

      }
  }

  return (
    <> 
    <Toaster/>
    <form onSubmit={handleSubmit}>
      <Group attached w="full" maxW="sm">
        <Input flex="1" id="textInput" value={localInput} placeholder="Indtast en todo" onChange={(e) => setLocalInput(e.target.value)} />
        <Button type="submit" bg="bg.subtle" variant="outline">
          Indsæt
        </Button>
      </Group>
    </form>
    </>
  )
}

export default InputField;