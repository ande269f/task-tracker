import { Button, Group, Input } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setTextInput } from "../store/slices/textInputSlice";
import { useState } from "react";
import { Alert } from "@chakra-ui/react"

const AlertUser = (title: string, description: string) => {
  return (
    <Alert.Root status="error">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>{title}</Alert.Title>
        <Alert.Description>
          {description}
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  )
}

const TextInput = () => {
  const dispatch: AppDispatch = useDispatch();
  const [localInput, setLocalInput] = useState<string>("");
  const userInput = useSelector((state: RootState) => state.form);

  const duplicatesDetected = (duplicateDetected: Boolean = false) => {
    userInput.forEach(element => {
      if (element.taskText == localInput) {
        duplicateDetected =  true;
      }
    }); return duplicateDetected
  }

  // lav en matching der loader igennem alle states. hvis der er et match, smid en fejl
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); 
      const submitTask = () => {
        dispatch(setTextInput({taskText: localInput, taskState: false, date: new Date() }))
      } 

      if (localInput.trim() === "") {
        AlertUser("Mangler tekst", "Dit input mangler en tekst")
      } else if (!duplicatesDetected()){
        submitTask()
      } else if (duplicatesDetected()) {

      } else {

      }
  }


  return (
    <> 
    <form onSubmit={handleSubmit}>
      <Group attached w="full" maxW="sm">
        <Input flex="1" placeholder="Indtast en todo" onChange={(e) => setLocalInput(e.target.value)} />
        <Button type="submit" bg="bg.subtle" variant="outline">
          Indsæt
        </Button>
      </Group>
    </form>
    </>
  )
}

export default TextInput;