import { Button } from "@chakra-ui/react";
import { HiDotsHorizontal } from "react-icons/hi";



export const DetailsButton = ({handleDetailsButton}: {handleDetailsButton: Function}) => {

  return (
    <div>
        <Button
        aria-label="Open details"
        onClick={(e) => { handleDetailsButton();  e.stopPropagation();}}
        variant="ghost"
        >
            <HiDotsHorizontal />
        </Button>
    </div>
  )
}