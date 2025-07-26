import { Button, Group, Input } from "@chakra-ui/react"
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setTextInput } from "../store/slices/textInputSlice";
import { useState } from "react";



const TextInput = () => {
  const dispatch: AppDispatch = useDispatch();
  const [localInput, setLocalInput] = useState<string>("");

  // håndtering af submit af samme værdi flere gange
  const [PreviousInput, setPreviousInput] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, prevInput = PreviousInput) => {
      e.preventDefault(); 
    if (localInput != prevInput) {
      dispatch(
        setTextInput({
          taskText: localInput, 
          taskState: false }))
        setPreviousInput(localInput);
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