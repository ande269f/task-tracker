import { Button, Group, Input } from "@chakra-ui/react"
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setTextInput } from "../store/slices/textInputSlice";
import { useState } from "react";

const TextInput = () => {
  const dispatch: AppDispatch = useDispatch();

  const [localInput, setLocalInput] = useState<string>("");


  return (
    <> 
    <form onSubmit={(e) => {e.preventDefault(); dispatch(setTextInput({ taskText: localInput, taskState: false }))}}>
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